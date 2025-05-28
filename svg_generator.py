import math

def svg_dialectical_wheel(slices, center_label="Core", radius=150, width=400, height=400):
    """
    slices: list of dicts, each with keys:
        - labels: list of (label, color) from center outward along the slice
    Example:
        slices = [
            {"labels": [("Clarity, relief", "yellow"), ("Family unity", "green"), ("Buy a house", "black"), ("Burden", "red")]},
            {"labels": [("Clarity, relief", "yellow"), ("Don't buy", "black"), ("Separation", "red")]},
        ]
    """
    cx, cy = width // 2, height // 2
    n = len(slices)
    angle_per = 2 * math.pi / n
    font_size = max(10, min(18, int(36 / n)))
    svg = [f'<svg width="{width}" height="{height}" xmlns="http://www.w3.org/2000/svg">']

    # Prepare defs for arc paths
    defs = ["<defs>"]
    arc_id_counter = 0

    # Draw concentric circles for each layer
    max_labels = max(len(sl["labels"]) for sl in slices)
    circle_colors = ["#C6E5B3", "#FFFFFF", "#F9C6CC", "#FFFF99"]  # yellow, green, white, pink/red
    for i in range(max_labels, 0, -1):
        r = radius * (0.3 + 0.7 * i / max_labels)
        color = circle_colors[i-1] if i-1 < len(circle_colors) else "#EEE"
        svg.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}" stroke="black" stroke-width="1"/>')

    # Draw center circle and label
    svg.append(f'<circle cx="{cx}" cy="{cy}" r="{radius*0.2}" fill="#FFFF99" stroke="black" stroke-width="2"/>')
    svg.append(
        f'<text x="{cx}" y="{cy}" font-size="16" font-weight="bold" text-anchor="middle" alignment-baseline="middle">{center_label}</text>'
    )

    # Draw each slice
    for i, sl in enumerate(slices):
        start_angle = i * angle_per
        end_angle = (i + 1) * angle_per
        angle_mid = (start_angle + end_angle) / 2
        n_labels = len(sl["labels"])
        for j, (label, color) in enumerate(sl["labels"]):
            r = radius * (0.3 + 0.7 * (j+1) / n_labels) - 20
            # Allow up to 4 lines and min font size 6 for all layers
            min_font = 6
            if j == 0:
                max_font = 14
            else:
                max_font = 18
            max_lines = min(2, len(label.split()))
            if n_labels > 1:
                font_size_layer = min_font + (max_font - min_font) * (j / (n_labels - 1))
            else:
                font_size_layer = min_font
            arc_length = abs(r * (end_angle - start_angle))
            font_size = min(max_font, font_size_layer)

            def estimate_text_width(text, font_size):
                return font_size * 0.6 * len(text)

            def wrap_text(label, max_width, font_size, max_lines=6):
                words = label.split()
                lines = []
                current_line = []
                for word in words:
                    test_line = current_line + [word]
                    test_line_str = ' '.join(test_line)
                    if estimate_text_width(test_line_str, font_size) <= max_width:
                        current_line.append(word)
                    else:
                        if current_line:
                            lines.append(' '.join(current_line))
                        current_line = [word]
                        if len(lines) >= max_lines:
                            break
                if current_line and len(lines) < max_lines:
                    lines.append(' '.join(current_line))
                return lines

            # Try to fit label, wrap if needed, reduce font if still too long
            lines = [label]
            while font_size > min_font:
                wrapped = wrap_text(label, arc_length, font_size, max_lines=max_lines)
                fits = all(estimate_text_width(line, font_size) < arc_length for line in wrapped)
                if fits:
                    lines = wrapped
                    break
                font_size -= 1

            # Draw each line as a separate arc, offsetting radius for each line
            for k, line in enumerate(lines[::-1]):  # first line is furthest from center
                line_r = r + (k - (len(lines)-1)/2) * (font_size + 2)
                arc_id = f"arc{arc_id_counter}"
                arc_id_counter += 1
                x1 = cx + line_r * math.cos(start_angle)
                y1 = cy + line_r * math.sin(start_angle)
                x2 = cx + line_r * math.cos(end_angle)
                y2 = cy + line_r * math.sin(end_angle)
                large_arc = 1 if (end_angle - start_angle) > math.pi else 0
                path_d = (
                    f"M {x1},{y1} "
                    f"A {line_r},{line_r} 0 {large_arc},1 {x2},{y2}"
                )
                defs.append(f'<path id="{arc_id}" d="{path_d}" fill="none"/>')
                svg.append(
                    f'<text font-size="{font_size}" fill="{color}"><textPath href="#{arc_id}" startOffset="50%" text-anchor="middle">{line}</textPath></text>'
                )
        # Draw the slice sector (optional, for visual separation)
        x1 = cx + radius * math.cos(start_angle)
        y1 = cy + radius * math.sin(start_angle)
        x2 = cx + radius * math.cos(end_angle)
        y2 = cy + radius * math.sin(end_angle)
        large_arc = 1 if angle_per > math.pi else 0
        path = (
            f'M {cx},{cy} '
            f'L {x1},{y1} '
            f'A {radius},{radius} 0 {large_arc},1 {x2},{y2} '
            f'Z'
        )
        svg.append(f'<path d="{path}" fill="none" stroke="#888" stroke-width="1"/>')

    defs.append("</defs>")
    svg.insert(1, "\n".join(defs))
    svg.append('</svg>')
    return "\n".join(svg)

def svg_dialectical_wheel_wisdom(wisdom_units, center_label="Core", radius=150, width=400, height=400):
    """
    wisdom_units: list of WisdomUnit objects
    Each WisdomUnit produces two slices: thesis (T-, T, T+) and antithesis (A+, A, A-), which are opposite each other.
    Slices are ordered so that thesis and antithesis are opposite.
    """
    thesis_slices = []
    antithesis_slices = []
    for wu in wisdom_units:
        # Thesis slice: T-, T, T+
        thesis_labels = []
        for attr, color in [("t_plus", "green"), ("t", "black"), ("t_minus", "red")]:
            comp = getattr(wu, attr, None)
            if comp and getattr(comp, "statement", None):
                thesis_labels.append((comp.statement, color))
        if thesis_labels:
            thesis_slices.append({"labels": thesis_labels})
    for wu in wisdom_units:
        # Antithesis slice: A+, A, A-
        antithesis_labels = []
        for attr, color in [("a_plus", "green"), ("a", "black"), ("a_minus", "red")]:
            comp = getattr(wu, attr, None)
            if comp and getattr(comp, "statement", None):
                antithesis_labels.append((comp.statement, color))
        if antithesis_labels:
            antithesis_slices.append({"labels": antithesis_labels})
    slices = thesis_slices + antithesis_slices
    return svg_dialectical_wheel(slices, center_label=center_label, radius=radius, width=width, height=height)

# Example usage:
slices = [
    {"labels": [("Family unity", "green"), ("Buy a house", "black"), ("Burden", "red")]},
    {"labels": [("Clarity, relief", "green"), ("Don't buy", "black"), ("Separation", "red")]},
    {"labels": [("Gheyness", "green"), ("Be homeless", "black"), ("Liberation", "red")]},
]
svg_code = svg_dialectical_wheel(slices, center_label="bruh")
with open("dialectical_wheel.svg", "w") as f:
    f.write(svg_code)
