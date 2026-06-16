import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef } from 'react';
import { Wheel } from '../components';
import { exportWheelSVG, exportWheelPNG, downloadBlob } from '../export';
import type { PerspectiveEvent, SegmentEvent } from '../types';

const samplePerspectives = [
  {
    "t_minus": { "alias": "T-", "statement": "Risk group lives", "explanation": "" },
    "t": { "alias": "T", "statement": "Pursue minister elimination", "explanation": "" },
    "t_plus": { "alias": "T+", "statement": "Achieve strategic goals", "explanation": "" },
    "a_plus": { "alias": "A+", "statement": "Ensure survival peacefully", "explanation": "" },
    "a": { "alias": "A", "statement": "Accept ransom offer", "explanation": "" },
    "a_minus": { "alias": "A-", "statement": "Compromise core ideals", "explanation": "" }
  },
  {
    "t_minus": { "alias": "A4-", "statement": "Jeopardize safety", "explanation": "" },
    "t": { "alias": "A4", "statement": "Pursue mission goals", "explanation": "" },
    "t_plus": { "alias": "A4+", "statement": "Uphold ideals", "explanation": "" },
    "a_plus": { "alias": "T4+", "statement": "Promote survival", "explanation": "" },
    "a": { "alias": "T4", "statement": "Ensure group safety", "explanation": "" },
    "a_minus": { "alias": "T4-", "statement": "Foster cowardice", "explanation": "" }
  },
  {
    "t_minus": { "alias": "T2-", "statement": "Endanger lives", "explanation": "" },
    "t": { "alias": "T2", "statement": "Face soldier threat", "explanation": "" },
    "t_plus": { "alias": "T2+", "statement": "Maintain integrity", "explanation": "" },
    "a_plus": { "alias": "A2+", "statement": "Ensure survival", "explanation": "" },
    "a": { "alias": "A2", "statement": "Take ransom deal", "explanation": "" },
    "a_minus": { "alias": "A2-", "statement": "Compromise principles", "explanation": "" }
  },
  {
    "t_minus": { "alias": "T3-", "statement": "Betray allies mission", "explanation": "" },
    "t": { "alias": "T3", "statement": "Take twenty million", "explanation": "" },
    "t_plus": { "alias": "T3+", "statement": "Gain safety wealth", "explanation": "" },
    "a_plus": { "alias": "A3+", "statement": "Uphold loyalty honor", "explanation": "" },
    "a": { "alias": "A3", "statement": "Refuse twenty million", "explanation": "" },
    "a_minus": { "alias": "A3-", "statement": "Risk death failure", "explanation": "" }
  }
];

const defaultStyles = {
  fontSize: 12,
  border: { width: 0.5, color: '#ccc' },
  thead: { color: '#333333', fontSize: 12 },
  tbody: {
    positive: { background: '#C6E5B3', color: '#2d5a2d' },
    negative: { background: '#F9C6CC', color: '#8b1538' },
    neutral: { background: '#ffffff', color: '#333333' },
    synthesis: { background: '#ffff7a' },
  },
};

const meta: Meta<typeof Wheel> = {
  title: 'Components/Wheel',
  component: Wheel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<number | null>(null);
    return (
      <Wheel
        {...args}
        selectedPerspective={selected}
        onPerspectiveClicked={(e: PerspectiveEvent) => {
          setSelected(e.perspectiveIndex === selected ? null : e.perspectiveIndex);
        }}
      />
    );
  },
  args: {
    perspectives: samplePerspectives,
    styles: defaultStyles,
  },
};

export const WhiteOutside: Story = {
  args: {
    ...Default.args,
    neutralOutside: true,
  },
};

export const TwoPerspectives: Story = {
  args: {
    ...Default.args,
    perspectives: samplePerspectives.slice(0, 2),
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    styles: {
      ...defaultStyles,
      tbody: {
        positive: { background: '#D4E8D0', color: '#2D5A2D' },
        negative: { background: '#E8D5E0', color: '#5C2D4F' },
        neutral: { background: '#F5F5DC', color: '#4A4A2E' },
        synthesis: { background: '#FFD700' },
      },
    },
  },
};

const longTextPerspectives = [
  {
    "t_minus": { "alias": "T1-", "statement": "Isolation and uncertainty about the future of personal entrepreneurial ambitions", "explanation": "" },
    "t": { "alias": "T1", "statement": "Personal entrepreneurial aspiration and self-directed career development", "explanation": "" },
    "t_plus": { "alias": "T1+", "statement": "Freedom and self-actualization through independent professional growth", "explanation": "" },
    "a_plus": { "alias": "A1+", "statement": "Stability and recognition within established institutional frameworks", "explanation": "" },
    "a": { "alias": "A1", "statement": "Institutional career integration and long-term corporate commitment", "explanation": "" },
    "a_minus": { "alias": "A1-", "statement": "Loss of autonomy and time for personal vision and creative pursuits", "explanation": "" }
  },
  {
    "t_minus": { "alias": "T2-", "statement": "Forfeiting stability and professional recognition from established networks", "explanation": "" },
    "t": { "alias": "T2", "statement": "Declining employment offer despite attractive compensation and benefits terms", "explanation": "" },
    "t_plus": { "alias": "T2+", "statement": "Protecting autonomy and entrepreneurial potential for self-directed fulfillment", "explanation": "" },
    "a_plus": { "alias": "A2+", "statement": "Gaining stability and career advancement through corporate position", "explanation": "" },
    "a": { "alias": "A2", "statement": "Accepting employment offer while abandoning entrepreneurial pursuit temporarily", "explanation": "" },
    "a_minus": { "alias": "A2-", "statement": "Losing autonomy and abandoning personal vision for corporate obligations", "explanation": "" }
  },
  {
    "t_minus": { "alias": "T3-", "statement": "Sacrificing security and professional validation from institutional belonging", "explanation": "" },
    "t": { "alias": "T3", "statement": "Prioritizing personal brand over corporate position and organizational identity", "explanation": "" },
    "t_plus": { "alias": "T3+", "statement": "Autonomy and self-directed fulfillment through independent professional identity", "explanation": "" },
    "a_plus": { "alias": "A3+", "statement": "Stability enabling long-term development and resource security", "explanation": "" },
    "a": { "alias": "A3", "statement": "Career advancement and resource security through institutional commitment", "explanation": "" },
    "a_minus": { "alias": "A3-", "statement": "Time constraints eroding personal vision and entrepreneurial momentum", "explanation": "" }
  },
  {
    "t_minus": { "alias": "T4-", "statement": "Loss of time and personal vision due to overwhelming corporate responsibilities", "explanation": "" },
    "t": { "alias": "T4", "statement": "Accepting security despite sacrificing autonomy and creative independence", "explanation": "" },
    "t_plus": { "alias": "T4+", "statement": "Leveraging corporate stability for personal growth and future opportunities", "explanation": "" },
    "a_plus": { "alias": "A4+", "statement": "Freedom and self-actualization potential through rejecting institutional constraints", "explanation": "" },
    "a": { "alias": "A4", "statement": "Refusing attractive offer to pursue independence and entrepreneurial vision", "explanation": "" },
    "a_minus": { "alias": "A4-", "statement": "Forfeiting stability and professional validation from corporate recognition", "explanation": "" }
  }
];

export const LongText: Story = {
  args: {
    ...Default.args,
    perspectives: longTextPerspectives,
  },
};

export const Export: Story = {
  render: (args) => {
    const ref = useRef<SVGSVGElement>(null);
    return (
      <div>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8 }}>
          <button
            onClick={() => {
              if (!ref.current) return;
              downloadBlob(exportWheelSVG(ref.current), 'wheel.svg');
            }}
            style={{ padding: '6px 12px', background: '#eee', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Download SVG
          </button>
          <button
            onClick={async () => {
              if (!ref.current) return;
              const blob = await exportWheelPNG(ref.current, { width: 2048 });
              downloadBlob(blob, 'wheel.png');
            }}
            style={{ padding: '6px 12px', background: '#eee', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Download PNG (2048px)
          </button>
        </div>
        <Wheel ref={ref} {...args} />
      </div>
    );
  },
  args: {
    perspectives: samplePerspectives,
    styles: defaultStyles,
  },
};

const shortPerspective = (i: number) => ({
  t_minus: `T${i} risk`,
  t: `Thesis ${i}`,
  t_plus: `T${i} gain`,
  a_plus: `A${i} gain`,
  a: `Antithesis ${i}`,
  a_minus: `A${i} risk`,
});

const longPerspective = (i: number) => ({
  t_minus: `Forced isolated learning with no knowledge transfer or collaborative growth opportunity`,
  t: `Individual work builds self-reliance and independent thinking capacity`,
  t_plus: `Autonomous mastery with reflective metacognitive awareness and deep expertise`,
  a_plus: `Interdependent learning networks with shared accountability and mutual support`,
  a: `Collaborative projects develop social and communication skills effectively`,
  a_minus: `Forced groupthink without individual voice recognition or personal achievement`,
});

export const OnePerspectiveShort: Story = {
  args: { perspectives: [shortPerspective(1)], styles: defaultStyles },
};

export const OnePerspectiveLong: Story = {
  args: { perspectives: [longPerspective(1)], styles: defaultStyles },
};

export const TwoPerspectivesShort: Story = {
  args: { perspectives: [shortPerspective(1), shortPerspective(2)], styles: defaultStyles },
};

export const TwoPerspectivesLong: Story = {
  args: { perspectives: [longPerspective(1), longPerspective(2)], styles: defaultStyles },
};

export const ThreePerspectivesShort: Story = {
  args: { perspectives: [shortPerspective(1), shortPerspective(2), shortPerspective(3)], styles: defaultStyles },
};

export const ThreePerspectivesLong: Story = {
  args: { perspectives: [longPerspective(1), longPerspective(2), longPerspective(3)], styles: defaultStyles },
};

export const FourPerspectivesShort: Story = {
  args: { perspectives: [shortPerspective(1), shortPerspective(2), shortPerspective(3), shortPerspective(4)], styles: defaultStyles },
};

export const FourPerspectivesLong: Story = {
  args: { perspectives: [longPerspective(1), longPerspective(2), longPerspective(3), longPerspective(4)], styles: defaultStyles },
};

export const FocusedSegment: Story = {
  render: (args) => {
    const [focused, setFocused] = useState<string | null>(null);
    const [selected, setSelected] = useState<number | null>(null);
    const segments = ['T', 'A4', 'T2', 'T3', 'A', 'T4', 'A2', 'A3'];
    return (
      <div>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {segments.map(id => (
            <button
              key={id}
              onClick={() => setFocused(id)}
              style={{
                padding: '4px 8px',
                background: focused === id ? '#333' : '#eee',
                color: focused === id ? '#fff' : '#333',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              {id}
            </button>
          ))}
          <button
            onClick={() => { setFocused(null); setSelected(null); }}
            style={{ padding: '4px 8px', background: '#fee', border: 'none', borderRadius: 4, cursor: 'pointer' }}
          >
            Clear
          </button>
        </div>
        <Wheel
          {...args}
          focusedSegment={focused}
          selectedPerspective={selected}
          onSegmentClicked={(e: SegmentEvent) => {
            setFocused(e.segmentId);
            setSelected(e.perspectiveIndex);
          }}
        />
      </div>
    );
  },
  args: {
    perspectives: samplePerspectives,
    styles: defaultStyles,
  },
};
