import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useState, useRef } from 'react';
import { Wheel, Callout } from '../components';
import { exportWheelSVG, exportWheelPNG, downloadBlob } from '../export';
import type { SegmentEvent } from '../types';

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
    "t_minus": { "alias": "T4-", "statement": "Jeopardize safety", "explanation": "" },
    "t": { "alias": "T4", "statement": "Pursue mission goals", "explanation": "" },
    "t_plus": { "alias": "T4+", "statement": "Uphold ideals", "explanation": "" },
    "a_plus": { "alias": "A4+", "statement": "Promote survival", "explanation": "" },
    "a": { "alias": "A4", "statement": "Ensure group safety", "explanation": "" },
    "a_minus": { "alias": "A4-", "statement": "Foster cowardice", "explanation": "" }
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
  },
  tfoot: { background: '#ffff7a' },
};

const meta: Meta<typeof Wheel> = {
  title: 'Components/Wheel',
  component: Wheel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    neutralOutside: {
      control: { type: 'select' },
      options: [false, true, 'header'],
    },
    direction: {
      control: { type: 'select' },
      options: [undefined, 'left', 'right'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    perspectives: samplePerspectives,
    styles: defaultStyles,
    interactive: true,
  },
};

export const WhiteOutside: Story = {
  args: {
    ...Default.args,
    neutralOutside: true,
  },
};

export const NeutralHeader: Story = {
  args: {
    ...Default.args,
    neutralOutside: 'header',
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
      },
      tfoot: { background: '#FFD700' },
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

// A single perspective whose neutral STATEMENT is a long sentence while the
// ±summaries are short — the case where per-ring shrink makes the statement
// render tiny (and thus read as "less important") next to the big summaries.
const lopsidedPerspective = [
  {
    "t_minus": { "alias": "T1-", "statement": "Rigid preplanning starving cash flow", "explanation": "" },
    "t": { "alias": "T1", "statement": "Preplanning creates structural stability — denser groups, less teacher search stress, packaged courses with committed slots — and deserves to be the primary sales mode", "explanation": "" },
    "t_plus": { "alias": "T1+", "statement": "Preplanned backbone with generated fill", "explanation": "" },
    "a_plus": { "alias": "A1+", "statement": "Generated courses bounded by density rules", "explanation": "" },
    "a": { "alias": "A1", "statement": "Generated courses create immediate conversion and cash flow — there's always something available to sell, people book and pay now — and the business can't survive without this responsiveness", "explanation": "" },
    "a_minus": { "alias": "A1-", "statement": "Endless generation depleting focus and density", "explanation": "" }
  }
];

// Per-ring shrink (opt-out): the long neutral statement collapses to a tiny
// font while the short ±summaries stay large.
export const SizingShrink: Story = {
  args: {
    perspectives: lopsidedPerspective,
    styles: defaultStyles,
    header: 'cycle',
    sizingMode: 'shrink',
  },
};

// Balance (default): one shared font across body rings, bands flex (clamped) so
// the text-heavy neutral ring grows and fonts come out near-equal.
export const SizingBalance: Story = {
  args: {
    perspectives: lopsidedPerspective,
    styles: defaultStyles,
    header: 'cycle',
  },
};

// Balance across multiple perspectives with uniformly long text.
export const SizingBalanceFourLong: Story = {
  args: {
    ...Default.args,
    perspectives: longTextPerspectives,
  },
};

// Header mode + balance: the merged neutral+cycle ring sizes itself, but the
// positive and negative rings still balance to one shared font between them.
export const SizingBalanceHeader: Story = {
  args: {
    perspectives: lopsidedPerspective,
    styles: defaultStyles,
    neutralOutside: 'header',
  },
};

// Same header layout, shrink mode — positive/negative size independently.
export const SizingShrinkHeader: Story = {
  args: {
    perspectives: lopsidedPerspective,
    styles: defaultStyles,
    neutralOutside: 'header',
    sizingMode: 'shrink',
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
    const segments = args.perspectives!.flatMap((p, i) => {
      const tAlias = typeof p.t === 'string' ? `T${i + 1}` : (p.t.alias || `T${i + 1}`);
      const aAlias = typeof p.a === 'string' ? `A${i + 1}` : (p.a.alias || `A${i + 1}`);
      return [{ id: tAlias, pi: i }, { id: aAlias, pi: i }];
    });
    return (
      <div>
        <div style={{ marginBottom: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {segments.map(seg => (
            <button
              key={seg.id}
              onClick={() => { setFocused(seg.id); setSelected(seg.pi); }}
              style={{
                padding: '4px 8px',
                background: focused === seg.id ? '#333' : '#eee',
                color: focused === seg.id ? '#fff' : '#333',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
              }}
            >
              {seg.id}
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

export const PerCellStyling: Story = {
  args: {
    perspectives: samplePerspectives,
    styles: {
      ...defaultStyles,
      tbody: {
        ...defaultStyles.tbody,
        positive: {
          ...defaultStyles.tbody.positive,
          thesis: { background: '#A8D99C' },
          0: { background: '#8BC34A', color: '#1b3d1b' },
        },
        negative: {
          ...defaultStyles.tbody.negative,
          antithesis: { background: '#F4A6B0' },
          1: { background: '#E57373', color: '#fff' },
        },
      },
      tfoot: {
        background: '#ffff7a',
        0: { background: '#FFD54F' },
        1: { background: '#FF8A65' },
        2: { background: '#81C784' },
        3: { background: '#64B5F6' },
      },
    },
    interactive: true,
  },
};

export const DirectionRight: Story = {
  args: {
    ...Default.args,
    direction: 'right',
  },
};

export const DirectionLeft: Story = {
  args: {
    ...Default.args,
    direction: 'left',
  },
};

export const DirectionCycleHeader: Story = {
  args: {
    ...Default.args,
    header: 'cycle',
    direction: 'right',
  },
};

export const DirectionStyled: Story = {
  args: {
    ...Default.args,
    direction: 'right',
    styles: {
      ...defaultStyles,
      thead: {
        ...defaultStyles.thead,
        arrow: { color: '#e63946', width: 1.5 },
        hoverArrowColor: '#d00000',
      },
    },
  },
};

export const DirectionHidden: Story = {
  args: {
    ...Default.args,
    styles: {
      ...defaultStyles,
      arrow: { color: 'transparent', width: 1 },
    },
  },
};

export const InwardSpiral: Story = {
  args: {
    ...Default.args,
    showInwardSpiral: true,
  },
};

export const InwardSpiralNeutralOutside: Story = {
  args: {
    ...Default.args,
    neutralOutside: true,
    showInwardSpiral: true,
  },
};

export const SpiralLeftDirection: Story = {
  args: {
    ...Default.args,
    direction: 'left',
    showInwardSpiral: true,
  },
};

export const SpiralOnePerspective: Story = {
  args: {
    perspectives: [samplePerspectives[0]],
    styles: defaultStyles,
    showInwardSpiral: true,
  },
};

export const CalloutOnePerspective: Story = {
  render: (args) => (
    <Wheel {...args}>
      <Callout segment="T" border={{ color: '#2d5a2d' }}>
        <div><strong>segment="T"</strong></div>
        <div>Rank by complexity</div>
      </Callout>
      <Callout rightEdge="A" border={{ color: '#8b1538' }}>
        <div><strong>rightEdge="A"</strong></div>
        <div>Document anomalies</div>
      </Callout>
    </Wheel>
  ),
  args: {
    perspectives: [samplePerspectives[0]],
    styles: defaultStyles,
    interactive: true,
  },
};

export const CalloutOnePerspectiveSpiral: Story = {
  render: (args) => (
    <Wheel {...args}>
      <Callout segment="T" border={{ color: '#2d5a2d' }}>
        <div><strong>segment="T"</strong></div>
        <div>Rank by complexity</div>
      </Callout>
      <Callout rightEdge="A" border={{ color: '#8b1538' }}>
        <div><strong>rightEdge="A"</strong></div>
        <div>Document anomalies</div>
      </Callout>
    </Wheel>
  ),
  args: {
    perspectives: [samplePerspectives[0]],
    styles: defaultStyles,
    showInwardSpiral: true,
    interactive: true,
  },
};

export const PerCellNeutralHeader: Story = {
  args: {
    perspectives: samplePerspectives,
    neutralOutside: 'header',
    styles: {
      ...defaultStyles,
      thead: {
        ...defaultStyles.thead,
        neutral: {
          background: '#E8EAF6',
          color: '#1A237E',
          thesis: { background: '#C5CAE9' },
        },
      },
    },
    interactive: true,
  },
};

export const WithCallouts: Story = {
  render: (args) => (
    <Wheel {...args}>
      <Callout segment="T" header={<strong>segment="T"</strong>}>
        <div>Rank by complexity</div>
      </Callout>
      <Callout segment="T4" border={{ color: '#2d5a2d' }} header="segment=T4">
        <div>Cement evaluation protocol</div>
      </Callout>
      <Callout rightEdge="A" header={<strong>rightEdge="A"</strong>}>
        <div>Pre-defined timelines</div>
      </Callout>
      <Callout rightEdge="A4" border={{ color: '#8b1538' }} header="rightEdge=A4">
        <div>Document anomalies resolutions</div>
      </Callout>
    </Wheel>
  ),
  args: {
    perspectives: samplePerspectives,
    styles: defaultStyles,
    interactive: true,
  },
};

export const CalloutRichContent: Story = {
  render: (args) => (
    <Wheel {...args}>
      <Callout segment="T" border={{ color: '#2d5a2d', width: 1.5 }} header='segment="T"'>
        <div style={{ background: '#fff', borderRadius: 3, padding: '4px 8px', margin: -4 }}>
          <div><strong>Score: 0.74</strong></div>
          <p style={{ margin: '4px 0', fontSize: 10 }}>
            This treatment ranks alternatives by complexity score and filters
            out any perspective below the threshold. It has been validated across
            multiple scenarios with consistent results.
          </p>
          <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
            <button style={{ fontSize: 9, padding: '2px 6px', cursor: 'pointer' }}>Edit</button>
            <button style={{ fontSize: 9, padding: '2px 6px', cursor: 'pointer' }}>Delete</button>
            <button style={{ fontSize: 9, padding: '2px 6px', cursor: 'pointer', background: '#2d5a2d', color: '#fff', border: 'none', borderRadius: 3 }}>Apply</button>
          </div>
        </div>
      </Callout>
      <Callout rightEdge="A" border={{ color: '#8b1538' }}>
        <div><strong>rightEdge="A"</strong></div>
        <div>Short one</div>
      </Callout>
    </Wheel>
  ),
  args: {
    perspectives: samplePerspectives,
    styles: defaultStyles,
    interactive: true,
  },
};

export const CalloutsWithSpiral: Story = {
  render: (args) => (
    <Wheel {...args}>
      <Callout segment="T" header={<strong>segment="T"</strong>}>
        <div>Rank by complexity</div>
      </Callout>
      <Callout rightEdge="T4" border={{ color: '#2d5a2d' }} header='rightEdge="T4"'>
        <div>Cement evaluation protocol</div>
      </Callout>
      <Callout segment="A" header={<strong>segment="A"</strong>}>
        <div>Pre-defined timelines</div>
      </Callout>
      <Callout rightEdge="A4" border={{ color: '#8b1538' }} header='rightEdge="A4"'>
        <div>Document anomalies resolutions</div>
      </Callout>
    </Wheel>
  ),
  args: {
    perspectives: samplePerspectives,
    styles: defaultStyles,
    showInwardSpiral: true,
    interactive: true,
  },
};

export const CalloutsNeutralOutside: Story = {
  render: (args) => (
    <Wheel {...args}>
      <Callout segment="T1" border={{ color: '#2d5a2d' }} header='segment="T1"'>
        <div>Isolation and uncertainty</div>
      </Callout>
      <Callout rightEdge="T2" border={{ color: '#2d5a2d' }} header='rightEdge="T2"'>
        <div>Forfeiting stability</div>
      </Callout>
      <Callout segment="A1" border={{ color: '#8b1538' }} header='segment="A1"'>
        <div>Loss of autonomy</div>
      </Callout>
      <Callout rightEdge="A2" border={{ color: '#8b1538' }} header='rightEdge="A2"'>
        <div>Losing autonomy</div>
      </Callout>
    </Wheel>
  ),
  args: {
    perspectives: longTextPerspectives,
    styles: defaultStyles,
    neutralOutside: true,
    interactive: true,
  },
};
