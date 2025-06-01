import math

def get_label_position(cx, cy, radius, slice_index, n_slices, layer_index, n_layers, angle_offset=0, r_offset=0):
    """Calculate the position of a label given its slice and layer indices, with optional radial offset."""
    angle_per = 2 * math.pi / n_slices
    angle = slice_index * angle_per + angle_per/2 + angle_offset
    r = radius * (0.3 + 0.7 * (layer_index + 1) / n_layers) + r_offset
    x = cx + r * math.cos(angle)
    y = cy + r * math.sin(angle)
    return x, y

def draw_arrow(svg, start_x, start_y, end_x, end_y, cx, cy, color="black", stroke_width=2, curve_strength=0.3):
    """Draw a curved arrow between two points, curving outward from the center (cx, cy)."""
    # Midpoint
    mid_x = (start_x + end_x) / 2
    mid_y = (start_y + end_y) / 2

    # Vector from center to midpoint
    vec_x = mid_x - cx
    vec_y = mid_y - cy
    vec_len = math.sqrt(vec_x**2 + vec_y**2)
    if vec_len == 0:
        vec_len = 1  # avoid division by zero

    # Offset control point outward from center
    offset = math.sqrt((end_x - start_x)**2 + (end_y - start_y)**2) * curve_strength
    control_x = mid_x + (vec_x / vec_len) * offset
    control_y = mid_y + (vec_y / vec_len) * offset

    # Arrowhead
    angle = math.atan2(end_y - control_y, end_x - control_x)
    arrow_length = 10
    arrow_angle = math.pi/6
    arrow_x1 = end_x - arrow_length * math.cos(angle - arrow_angle)
    arrow_y1 = end_y - arrow_length * math.sin(angle - arrow_angle)
    arrow_x2 = end_x - arrow_length * math.cos(angle + arrow_angle)
    arrow_y2 = end_y - arrow_length * math.sin(angle + arrow_angle)

    # Draw the curved line
    svg.append(f'<path d="M {start_x},{start_y} Q {control_x},{control_y} {end_x},{end_y}" '
               f'stroke="{color}" stroke-width="{stroke_width}" fill="none"/>')
    # Draw the arrow head
    svg.append(f'<path d="M {end_x},{end_y} L {arrow_x1},{arrow_y1} L {arrow_x2},{arrow_y2} Z" '
               f'fill="{color}"/>')

def create_slice(slice_data, slice_index, cx, cy, radius, slice_angle=120, total_slices=8, 
                 layer_colors=None, font_sizes=None, show_boundaries=True, clickable=True):
    """
    Create a configurable slice as an independent SVG group.
    
    Args:
        slice_data: dict with 'labels' key containing list of (label, color) tuples
        slice_index: index of this slice
        cx, cy: center coordinates
        radius: outer radius of the slice
        slice_angle: angle of the slice in degrees (default 120)
        total_slices: total number of slices in the wheel (for positioning)
        layer_colors: list of background colors for each layer (default: green, white, pink, yellow)
        font_sizes: list of font sizes for each layer (default: [8, 10, 14])
        show_boundaries: whether to draw slice boundary lines
        clickable: whether to add clickable area
    
    Returns:
        List of SVG elements forming the slice
    """
    # Default values
    if layer_colors is None:
        layer_colors = ["#C6E5B3", "#FFFFFF", "#F9C6CC", "#FFFF99"]  # green, white, pink, yellow
    if font_sizes is None:
        font_sizes = [8, 10, 14]
    
    # Calculate slice positioning
    slice_center_angle = slice_index * (360 / total_slices)
    half_angle = slice_angle / 2
    start_angle = slice_center_angle - half_angle
    end_angle = slice_center_angle + half_angle
    
    labels = slice_data["labels"]
    n_labels = len(labels)
    
    slice_group = []
    slice_group.append(f'<g class="slice-component" data-slice="{slice_index}" transform="rotate({slice_center_angle} {cx} {cy})">')
    
    # Create background sectors for each layer within the slice
    for layer in range(n_labels):
        inner_radius = radius * (0.3 + 0.7 * layer / n_labels)
        outer_radius = radius * (0.3 + 0.7 * (layer + 1) / n_labels)
        
        # Create sector path for this layer
        inner_x1 = cx + inner_radius * math.cos(math.radians(-half_angle))
        inner_y1 = cy + inner_radius * math.sin(math.radians(-half_angle))
        inner_x2 = cx + inner_radius * math.cos(math.radians(half_angle))
        inner_y2 = cy + inner_radius * math.sin(math.radians(half_angle))
        
        outer_x1 = cx + outer_radius * math.cos(math.radians(-half_angle))
        outer_y1 = cy + outer_radius * math.sin(math.radians(-half_angle))
        outer_x2 = cx + outer_radius * math.cos(math.radians(half_angle))
        outer_y2 = cy + outer_radius * math.sin(math.radians(half_angle))
        
        color = layer_colors[layer % len(layer_colors)]
        
        # Determine if we need a large arc flag (for slices > 180 degrees)
        large_arc = 1 if slice_angle > 180 else 0
        
        # Create sector path: outer arc, lines to inner arc, inner arc back
        path_d = f"M {outer_x1},{outer_y1} "
        path_d += f"A {outer_radius},{outer_radius} 0 {large_arc},1 {outer_x2},{outer_y2} "
        path_d += f"L {inner_x2},{inner_y2} "
        path_d += f"A {inner_radius},{inner_radius} 0 {large_arc},0 {inner_x1},{inner_y1} Z"
        
        slice_group.append(f'<path d="{path_d}" fill="{color}" stroke="#888" stroke-width="0.5"/>')
    
    # Add text labels along arcs within the slice
    for j, (label, color) in enumerate(labels):
        # Calculate radius for this layer
        text_radius = radius * (0.3 + 0.7 * (j + 1) / n_labels) - 10
        
        # Font size for this layer
        font_size = font_sizes[j % len(font_sizes)]
        
        # Create arc path for text
        arc_start_x = cx + text_radius * math.cos(math.radians(-half_angle))
        arc_start_y = cy + text_radius * math.sin(math.radians(-half_angle))
        arc_end_x = cx + text_radius * math.cos(math.radians(half_angle))
        arc_end_y = cy + text_radius * math.sin(math.radians(half_angle))
        
        arc_id = f"slice-{slice_index}-arc-{j}"
        large_arc = 1 if slice_angle > 180 else 0
        arc_path = f"M {arc_start_x},{arc_start_y} A {text_radius},{text_radius} 0 {large_arc},1 {arc_end_x},{arc_end_y}"
        
        slice_group.append(f'<path id="{arc_id}" d="{arc_path}" fill="none"/>')
        slice_group.append(f'<text font-size="{font_size}" fill="{color}"><textPath href="#{arc_id}" startOffset="50%" text-anchor="middle">{label}</textPath></text>')
    
    # Add slice boundaries if requested
    if show_boundaries:
        boundary_x1 = cx + radius * math.cos(math.radians(-half_angle))
        boundary_y1 = cy + radius * math.sin(math.radians(-half_angle))
        boundary_x2 = cx + radius * math.cos(math.radians(half_angle))
        boundary_y2 = cy + radius * math.sin(math.radians(half_angle))
        
        slice_group.append(f'<line x1="{cx}" y1="{cy}" x2="{boundary_x1}" y2="{boundary_y1}" stroke="#888" stroke-width="1"/>')
        slice_group.append(f'<line x1="{cx}" y1="{cy}" x2="{boundary_x2}" y2="{boundary_y2}" stroke="#888" stroke-width="1"/>')
    
    # Add clickable area if requested
    if clickable:
        boundary_x1 = cx + radius * math.cos(math.radians(-half_angle))
        boundary_y1 = cy + radius * math.sin(math.radians(-half_angle))
        boundary_x2 = cx + radius * math.cos(math.radians(half_angle))
        boundary_y2 = cy + radius * math.sin(math.radians(half_angle))
        
        large_arc = 1 if slice_angle > 180 else 0
        slice_path = f"M {cx},{cy} L {boundary_x1},{boundary_y1} A {radius},{radius} 0 {large_arc},1 {boundary_x2},{boundary_y2} Z"
        slice_group.append(f'<path class="clickable-slice" data-slice="{slice_index}" d="{slice_path}" fill="transparent" stroke="transparent"/>')
    
    slice_group.append('</g>')
    return slice_group

def create_120_degree_slice(slice_data, slice_index, cx, cy, radius):
    """Legacy function for backward compatibility - creates a 120-degree slice."""
    return create_slice(slice_data, slice_index, cx, cy, radius, slice_angle=120, total_slices=8)

def svg_dialectical_wheel(slices, center_label="Core", radius=150, width=400, height=400, 
                         arrows=None, interactive=False, slice_angle=120, 
                         layer_colors=None, font_sizes=None):
    """
    Generate SVG for dialectical wheel using configurable slice components.
    
    Args:
        slices: list of dicts, each with 'labels' key containing list of (label, color) tuples
        center_label: text for center circle
        radius: outer radius of wheel
        width, height: SVG dimensions
        arrows: list of arrow specifications
        interactive: if True, adds clickable slice functionality
        slice_angle: angle of each slice in degrees (default 120)
        layer_colors: list of background colors for layers
        font_sizes: list of font sizes for layers
    """
    cx, cy = width // 2, height // 2
    n_slices = len(slices)
    
    # Start SVG
    #svg = [f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">']
    svg = [f'<svg class="wheel-svg" viewBox="0 0 {width} {height}">']

    if interactive:
        svg.append('<g class="record">')
    
    # Add defs section for arc paths
    svg.append('<defs>')
    svg.append('</defs>')
    
    # Create each slice component
    svg.append('<g id="slice-container">')
    for i, slice_data in enumerate(slices):
        slice_component = create_slice(
            slice_data, i, cx, cy, radius, 
            slice_angle=slice_angle, 
            total_slices=n_slices,
            layer_colors=layer_colors,
            font_sizes=font_sizes,
            clickable=interactive
        )
        svg.extend(slice_component)
    svg.append('</g>')

    # Draw center circle and label
    center_radius = radius * 0.2
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="{center_radius}" fill="#FFC107"/>')
    svg.append(f'<text x="{cx}" y="{cy}" font-size="16" font-weight="bold" text-anchor="middle" alignment-baseline="middle">{center_label}</text>')

    # Draw arrows if specified
    if arrows:
        for arrow in arrows:
            from_x, from_y = get_label_position(
                cx, cy, radius,
                arrow['from_slice'], n_slices,
                arrow['from_layer'], max(len(sl["labels"]) for sl in slices),
                r_offset=-15
            )
            to_x, to_y = get_label_position(
                cx, cy, radius,
                arrow['to_slice'], n_slices,
                arrow['to_layer'], max(len(sl["labels"]) for sl in slices),
                r_offset=-15
            )
            color = arrow.get('color', 'black')
            draw_arrow(svg, from_x, from_y, to_x, to_y, cx, cy, color=color)

    if interactive:
        svg.append('</g>')
    
    svg.append('</svg>')
    return "\n".join(svg)

def svg_dialectical_wheel_wisdom(wisdom_units, center_label="Core", radius=150, width=400, height=400, 
                                arrows=None, interactive=True, slice_angle=120, 
                                layer_colors=None, font_sizes=None):
    """
    Generate dialectical wheel from WisdomUnit objects with configurable slice properties.
    
    Args:
        wisdom_units: list of WisdomUnit objects
        center_label: text for center circle
        radius: outer radius of wheel
        width, height: SVG dimensions
        arrows: list of arrow specifications
        interactive: if True, generates SVG with interactive elements
        slice_angle: angle of each slice in degrees (default 120)
        layer_colors: list of background colors for layers
        font_sizes: list of font sizes for layers
    
    Each WisdomUnit produces a thesis-antithesis pair: thesis (T-, T, T+) and antithesis (A+, A, A-), 
    which are positioned opposite each other in the wheel.
    """
    thesis_antithesis_pairs = []
    
    for wu in wisdom_units:
        # Thesis slice: T-, T, T+
        thesis_labels = []
        for attr, color in [("t_plus", "green"), ("t", "black"), ("t_minus", "red")]:
            comp = getattr(wu, attr, None)
            if comp and getattr(comp, "statement", None):
                thesis_labels.append((comp.statement, color))
        
        # Antithesis slice: A+, A, A-
        antithesis_labels = []
        for attr, color in [("a_plus", "green"), ("a", "black"), ("a_minus", "red")]:
            comp = getattr(wu, attr, None)
            if comp and getattr(comp, "statement", None):
                antithesis_labels.append((comp.statement, color))
        
        # Only add pairs where we have at least one label for each side
        if thesis_labels and antithesis_labels:
            thesis_antithesis_pairs.append({
                'thesis': {"labels": thesis_labels},
                'antithesis': {"labels": antithesis_labels}
            })
    
    return create_thesis_antithesis_wheel(
        thesis_antithesis_pairs, 
        center_label=center_label, 
        radius=radius, 
        width=width, 
        height=height,
        slice_angle=slice_angle, 
        interactive=interactive, 
        layer_colors=layer_colors, 
        font_sizes=font_sizes
    )

def create_thesis_antithesis_wheel(thesis_antithesis_pairs, center_label="Core", radius=150, width=400, height=400, 
                                  slice_angle=120, interactive=True, layer_colors=None, font_sizes=None):
    """
    Create a dialectical wheel with thesis-antithesis pairs positioned opposite each other.
    
    Args:
        thesis_antithesis_pairs: list of dicts, each containing:
            - 'thesis': dict with 'labels' key (list of (label, color) tuples)
            - 'antithesis': dict with 'labels' key (list of (label, color) tuples)
        center_label: text for center circle
        radius: outer radius of wheel
        width, height: SVG dimensions
        slice_angle: angle of each slice in degrees
        interactive: if True, adds clickable slice functionality
        layer_colors: list of background colors for layers
        font_sizes: list of font sizes for layers
    
    Returns:
        SVG string with thesis-antithesis paired wheel
    """
    n_pairs = len(thesis_antithesis_pairs)
    total_slices = n_pairs * 2
    
    # Create slices list with proper positioning
    slices = []
    slice_positioning = []  # Track which slice is thesis/antithesis and its pair
    
    for i, pair in enumerate(thesis_antithesis_pairs):
        # Thesis angle
        thesis_angle = i * (360 / n_pairs)
        # Antithesis angle (opposite side)
        antithesis_angle = (thesis_angle + 180) % 360
        
        # Add to positioning tracking
        slice_positioning.append({
            'type': 'thesis',
            'pair_index': i,
            'angle': thesis_angle,
            'partner_angle': antithesis_angle
        })
        slice_positioning.append({
            'type': 'antithesis', 
            'pair_index': i,
            'angle': antithesis_angle,
            'partner_angle': thesis_angle
        })
    
    # Sort by angle to get proper slice order
    slice_positioning.sort(key=lambda x: x['angle'])
    
    # Build slices list in angle order
    for pos_info in slice_positioning:
        pair = thesis_antithesis_pairs[pos_info['pair_index']]
        if pos_info['type'] == 'thesis':
            slices.append(pair['thesis'])
        else:
            slices.append(pair['antithesis'])
    
    # Generate the wheel with custom slice positioning
    cx, cy = width // 2, height // 2
    
    # Start SVG
    #svg = [f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">']
    svg = [f'<svg class="wheel-svg" viewBox="0 0 {width} {height}">']
    
    if interactive:
        svg.append('<g class="record">')
    
    # Add defs section
    svg.append('<defs>')
    svg.append('</defs>')
    
    # Create each slice with custom positioning
    svg.append('<g id="slice-container">')
    for i, slice_data in enumerate(slices):
        pos_info = slice_positioning[i]
        
        # Create slice with explicit angle positioning
        slice_component = create_slice_at_angle(
            slice_data, i, cx, cy, radius,
            angle=pos_info['angle'],
            slice_angle=slice_angle,
            layer_colors=layer_colors,
            font_sizes=font_sizes,
            clickable=interactive,
            slice_type=pos_info['type'],
            pair_index=pos_info['pair_index']
        )
        svg.extend(slice_component)
    svg.append('</g>')
    
    # Draw center circle and label
    center_radius = radius * 0.2
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="{center_radius}" fill="#FFC107"/>')
    svg.append(f'<text x="{cx}" y="{cy}" font-size="16" font-weight="bold" text-anchor="middle" alignment-baseline="middle">{center_label}</text>')
    
    if interactive:
        svg.append('</g>')
    
    svg.append('</svg>')
    return "\n".join(svg)

def create_slice_at_angle(slice_data, slice_index, cx, cy, radius, angle, slice_angle=120,
                         layer_colors=None, font_sizes=None, show_boundaries=True, 
                         clickable=True, slice_type="thesis", pair_index=0):
    """
    Create a slice positioned at a specific angle.
    
    Args:
        slice_data: dict with 'labels' key containing list of (label, color) tuples
        slice_index: index of this slice
        cx, cy: center coordinates
        radius: outer radius of the slice
        angle: specific angle to position this slice at
        slice_angle: angle width of the slice in degrees
        layer_colors: list of background colors for each layer
        font_sizes: list of font sizes for each layer
        show_boundaries: whether to draw slice boundary lines
        clickable: whether to add clickable area
        slice_type: "thesis" or "antithesis"
        pair_index: index of the thesis-antithesis pair
    
    Returns:
        List of SVG elements forming the slice
    """
    # Default values
    if layer_colors is None:
        layer_colors = ["#C6E5B3", "#FFFFFF", "#F9C6CC", "#FFFF99"]  # green, white, pink, yellow
    if font_sizes is None:
        font_sizes = [8, 10, 14]
    
    half_angle = slice_angle / 2
    labels = slice_data["labels"]
    n_labels = len(labels)
    
    slice_group = []
    slice_group.append(f'<g class="slice-component {slice_type}-slice" data-slice="{slice_index}" data-pair="{pair_index}" data-type="{slice_type}" transform="rotate({angle} {cx} {cy})">')
    
    # Create background sectors for each layer within the slice
    for layer in range(n_labels):
        inner_radius = radius * (0.3 + 0.7 * layer / n_labels)
        outer_radius = radius * (0.3 + 0.7 * (layer + 1) / n_labels)
        
        # Create sector path for this layer
        inner_x1 = cx + inner_radius * math.cos(math.radians(-half_angle))
        inner_y1 = cy + inner_radius * math.sin(math.radians(-half_angle))
        inner_x2 = cx + inner_radius * math.cos(math.radians(half_angle))
        inner_y2 = cy + inner_radius * math.sin(math.radians(half_angle))
        
        outer_x1 = cx + outer_radius * math.cos(math.radians(-half_angle))
        outer_y1 = cy + outer_radius * math.sin(math.radians(-half_angle))
        outer_x2 = cx + outer_radius * math.cos(math.radians(half_angle))
        outer_y2 = cy + outer_radius * math.sin(math.radians(half_angle))
        
        color = layer_colors[layer % len(layer_colors)]
        
        # Determine if we need a large arc flag (for slices > 180 degrees)
        large_arc = 1 if slice_angle > 180 else 0
        
        # Create sector path: outer arc, lines to inner arc, inner arc back
        path_d = f"M {outer_x1},{outer_y1} "
        path_d += f"A {outer_radius},{outer_radius} 0 {large_arc},1 {outer_x2},{outer_y2} "
        path_d += f"L {inner_x2},{inner_y2} "
        path_d += f"A {inner_radius},{inner_radius} 0 {large_arc},0 {inner_x1},{inner_y1} Z"
        
        slice_group.append(f'<path d="{path_d}" fill="{color}" stroke="#888" stroke-width="0.5"/>')
    
    # Add text labels along arcs within the slice
    for j, (label, color) in enumerate(labels):
        # Calculate radius for this layer
        text_radius = radius * (0.3 + 0.7 * (j + 1) / n_labels) - 10
        
        # Font size for this layer
        font_size = font_sizes[j % len(font_sizes)]
        
        # Create arc path for text
        arc_start_x = cx + text_radius * math.cos(math.radians(-half_angle))
        arc_start_y = cy + text_radius * math.sin(math.radians(-half_angle))
        arc_end_x = cx + text_radius * math.cos(math.radians(half_angle))
        arc_end_y = cy + text_radius * math.sin(math.radians(half_angle))
        
        arc_id = f"slice-{slice_index}-arc-{j}"
        large_arc = 1 if slice_angle > 180 else 0
        arc_path = f"M {arc_start_x},{arc_start_y} A {text_radius},{text_radius} 0 {large_arc},1 {arc_end_x},{arc_end_y}"
        
        slice_group.append(f'<path id="{arc_id}" d="{arc_path}" fill="none"/>')
        slice_group.append(f'<text font-size="{font_size}" fill="{color}"><textPath href="#{arc_id}" startOffset="50%" text-anchor="middle">{label}</textPath></text>')
    
    # Add slice boundaries if requested
    if show_boundaries:
        boundary_x1 = cx + radius * math.cos(math.radians(-half_angle))
        boundary_y1 = cy + radius * math.sin(math.radians(-half_angle))
        boundary_x2 = cx + radius * math.cos(math.radians(half_angle))
        boundary_y2 = cy + radius * math.sin(math.radians(half_angle))
        
        slice_group.append(f'<line x1="{cx}" y1="{cy}" x2="{boundary_x1}" y2="{boundary_y1}" stroke="#888" stroke-width="1"/>')
        slice_group.append(f'<line x1="{cx}" y1="{cy}" x2="{boundary_x2}" y2="{boundary_y2}" stroke="#888" stroke-width="1"/>')
    
    # Add clickable area if requested
    if clickable:
        boundary_x1 = cx + radius * math.cos(math.radians(-half_angle))
        boundary_y1 = cy + radius * math.sin(math.radians(-half_angle))
        boundary_x2 = cx + radius * math.cos(math.radians(half_angle))
        boundary_y2 = cy + radius * math.sin(math.radians(half_angle))
        
        large_arc = 1 if slice_angle > 180 else 0
        slice_path = f"M {cx},{cy} L {boundary_x1},{boundary_y1} A {radius},{radius} 0 {large_arc},1 {boundary_x2},{boundary_y2} Z"
        slice_group.append(f'<path class="clickable-slice" data-slice="{slice_index}" data-pair="{pair_index}" data-type="{slice_type}" d="{slice_path}" fill="transparent" stroke="transparent"/>')
    
    slice_group.append('</g>')
    return slice_group

# Example usage
if __name__ == "__main__":
    # Example with default 120-degree slices
    slices_120 = [
    {"labels": [("Family unity", "green"), ("Buy a house", "black"), ("Burden", "red")]},
    {"labels": [("Clarity, relief", "green"), ("Don't buy", "black"), ("Separation", "red")]},
    {"labels": [("Liberation", "green"), ("Be homeless", "black"), ("Discomfort", "red")]},
]

    # Example arrows connecting labels
    arrows = [
            {"from_slice": 1, "from_layer": 2, "to_slice": 0, "to_layer": 0, "color": "blue"},
            {"from_slice": 1, "from_layer": 0, "to_slice": 0, "to_layer": 2, "color": "purple"},
        ]

    # Generate interactive SVG with 120-degree slice components
    interactive_svg_120 = svg_dialectical_wheel(slices_120, center_label="Core", arrows=arrows, interactive=True)
    with open("dialectical_wheel_120deg.svg", "w") as f:
        f.write(interactive_svg_120)
    
    # Example with 45-degree slices (8 slices total)
    slices_45 = [
        {"labels": [("Option A+", "green"), ("Option A", "black"), ("Option A-", "red")]},
        {"labels": [("Option B+", "green"), ("Option B", "black"), ("Option B-", "red")]},
        {"labels": [("Option C+", "green"), ("Option C", "black"), ("Option C-", "red")]},
        {"labels": [("Option D+", "green"), ("Option D", "black"), ("Option D-", "red")]},
        {"labels": [("Option E+", "green"), ("Option E", "black"), ("Option E-", "red")]},
        {"labels": [("Option F+", "green"), ("Option F", "black"), ("Option F-", "red")]},
        {"labels": [("Option G+", "green"), ("Option G", "black"), ("Option G-", "red")]},
        {"labels": [("Option H+", "green"), ("Option H", "black"), ("Option H-", "red")]},
    ]
    
    # Generate wheel with 45-degree slices
    interactive_svg_45 = svg_dialectical_wheel(slices_45, center_label="Core", 
                                             slice_angle=45, interactive=True)
    with open("dialectical_wheel_45deg.svg", "w") as f:
        f.write(interactive_svg_45)
    
    # Example with custom colors and fonts
    custom_colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A"]
    custom_fonts = [12, 14, 16]
    
    interactive_svg_custom = svg_dialectical_wheel(slices_120, center_label="Custom", 
                                                 layer_colors=custom_colors,
                                                 font_sizes=custom_fonts,
                                                 interactive=True)
    with open("dialectical_wheel_custom.svg", "w") as f:
        f.write(interactive_svg_custom)
    
    # Example with thesis-antithesis pairs
    thesis_antithesis_pairs = [
        {
            'thesis': {"labels": [("Strategic power", "green"), ("Putin initiates war", "black"), ("Destructive aggression", "red")]},
            'antithesis': {"labels": [("Mutual understanding", "green"), ("Peace negotiations", "black"), ("Passive submission", "red")]}
        },
        {
            'thesis': {"labels": [("Liberation", "green"), ("Ukraine resists", "black"), ("Endless conflict", "red")]},
            'antithesis': {"labels": [("Immediate peace", "green"), ("Ukraine surrenders", "black"), ("Freedom lost", "red")]}
        },
        {
            'thesis': {"labels": [("Victory approaches", "green"), ("Offensive weakens", "black"), ("Resources drain", "red")]},
            'antithesis': {"labels": [("Military strength", "green"), ("Dominance persists", "black"), ("Total defeat", "red")]}
        }
    ]
    
    # Generate thesis-antithesis wheel
    thesis_antithesis_svg = create_thesis_antithesis_wheel(
        thesis_antithesis_pairs, 
        center_label="Ukraine Conflict", 
        slice_angle=120, 
        interactive=True
    )
    with open("dialectical_wheel_thesis_antithesis.svg", "w") as f:
        f.write(thesis_antithesis_svg)
