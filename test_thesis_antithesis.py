#!/usr/bin/env python3

from svg_generator import create_thesis_antithesis_wheel

# Test the thesis-antithesis wheel generation
thesis_antithesis_pairs = [
    {
        'thesis': {'labels': [('Strategic power', 'green'), ('Putin initiates war', 'black'), ('Destructive aggression', 'red')]},
        'antithesis': {'labels': [('Mutual understanding', 'green'), ('Peace negotiations', 'black'), ('Passive submission', 'red')]}
    },
    {
        'thesis': {'labels': [('Liberation', 'green'), ('Ukraine resists', 'black'), ('Endless conflict', 'red')]},
        'antithesis': {'labels': [('Immediate peace', 'green'), ('Ukraine surrenders', 'black'), ('Freedom lost', 'red')]}
    },
    {
        'thesis': {'labels': [('Victory approaches', 'green'), ('Offensive weakens', 'black'), ('Resources drain', 'red')]},
        'antithesis': {'labels': [('Military strength', 'green'), ('Dominance persists', 'black'), ('Total defeat', 'red')]}
    }
]

svg_content = create_thesis_antithesis_wheel(
    thesis_antithesis_pairs, 
    center_label='Ukraine Conflict', 
    slice_angle=120, 
    interactive=True
)

with open('test_thesis_antithesis.html', 'w') as f:
    f.write(f'''<!DOCTYPE html>
<html>
<head><title>Test Thesis-Antithesis Wheel</title></head>
<body style="margin: 0; padding: 20px; background: #f0f0f0;">
    <h1>Thesis-Antithesis Wheel Test</h1>
    <p>This wheel has 3 thesis-antithesis pairs positioned opposite each other:</p>
    <ul>
        <li><strong>Pair 1:</strong> Strategic Power (0°) ↔ Peace Negotiations (180°)</li>
        <li><strong>Pair 2:</strong> Ukraine Resists (120°) ↔ Ukraine Surrenders (300°)</li>
        <li><strong>Pair 3:</strong> Victory Approaches (240°) ↔ Military Dominance (60°)</li>
    </ul>
    {svg_content}
</body>
</html>''')

print('Generated test_thesis_antithesis.html') 