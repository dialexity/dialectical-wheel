import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
// Import directly from source for testing
import DialecticalWheel from '../components/DialecticalWheel';
// Import the CSS from source
import '../components/DialecticalWheel/DialecticalWheel.css';

// Sample wisdom units data from the HTML file
const sampleWisdomUnits = [
  {
    "t_minus": {
      "alias": "T-",
      "statement": "Risk group lives",
      "explanation": "Identified as negative risks in thesis context."
    },
    "t": {
      "alias": "T",
      "statement": "Pursue minister elimination",
      "explanation": "Derived from the original plan outlined in the context."
    },
    "t_plus": {
      "alias": "T+",
      "statement": "Achieve strategic goals",
      "explanation": "Derived from positive aspects of thesis pursuit."
    },
    "a_plus": {
      "alias": "A+",
      "statement": "Ensure survival peacefully",
      "explanation": "Positive aspect constructed to oppose thesis negative."
    },
    "a": {
      "alias": "A",
      "statement": "Accept ransom offer",
      "explanation": "Antithesis derived from opposing choice in scenario."
    },
    "a_minus": {
      "alias": "A-",
      "statement": "Compromise core ideals",
      "explanation": "Negative aspect formed to oppose thesis positive."
    }
  },
  {
    "t_minus": {
      "alias": "A4-",
      "statement": "Jeopardize safety",
      "explanation": "Identified as negative aspect of A."
    },
    "t": {
      "alias": "A4",
      "statement": "Pursue mission goals",
      "explanation": "Derived as antithesis of T."
    },
    "t_plus": {
      "alias": "A4+",
      "statement": "Uphold ideals",
      "explanation": "Identified as positive aspect of A."
    },
    "a_plus": {
      "alias": "T4+",
      "statement": "Promote survival",
      "explanation": "Identified as positive aspect of T."
    },
    "a": {
      "alias": "T4",
      "statement": "Ensure group safety",
      "explanation": "Inferred from the choice presented for living."
    },
    "a_minus": {
      "alias": "T4-",
      "statement": "Foster cowardice",
      "explanation": "Identified as negative aspect of T."
    }
  },
  {
    "t_minus": {
      "alias": "T2-",
      "statement": "Endanger lives",
      "explanation": "Derived by noting risks of engagement."
    },
    "t": {
      "alias": "T2",
      "statement": "Face soldier threat",
      "explanation": "Extracted from the warning issued by Bouteflika."
    },
    "t_plus": {
      "alias": "T2+",
      "statement": "Maintain integrity",
      "explanation": "Derived by identifying positive aspect of confrontation."
    },
    "a_plus": {
      "alias": "A2+",
      "statement": "Ensure survival",
      "explanation": "Derived as constructive side of alternative."
    },
    "a": {
      "alias": "A2",
      "statement": "Take ransom deal",
      "explanation": "Identified as opposing action."
    },
    "a_minus": {
      "alias": "A2-",
      "statement": "Compromise principles",
      "explanation": "Derived as negative side of acceptance."
    }
  },
  {
    "t_minus": {
      "alias": "T3-",
      "statement": "Betray allies mission",
      "explanation": "Extracted as the negative aspect from the context's implications of failing allies."
    },
    "t": {
      "alias": "T3",
      "statement": "Take twenty million",
      "explanation": "Identified from the offered alternative in the narrative."
    },
    "t_plus": {
      "alias": "T3+",
      "statement": "Gain safety wealth",
      "explanation": "Derived as the positive aspect by analyzing the benefits of acceptance."
    },
    "a_plus": {
      "alias": "A3+",
      "statement": "Uphold loyalty honor",
      "explanation": "Determined as the positive side that contradicts the negative aspect of the thesis."
    },
    "a": {
      "alias": "A3",
      "statement": "Refuse twenty million",
      "explanation": "Formulated as the antithesis opposing the primary thesis."
    },
    "a_minus": {
      "alias": "A3-",
      "statement": "Risk death failure",
      "explanation": "Ascertained as the negative side that contradicts the positive aspect of the thesis."
    }
  }
];

const componentOrder = [];

const meta: Meta<typeof DialecticalWheel> = {
  title: 'Components/DialecticalWheel',
  component: DialecticalWheel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    wisdomUnits: {
      description: 'Array of wisdom units to display',
    },
    componentOrder: {
      description: 'Order of components in the wheel',
    },
    preferences: {
      description: 'User preferences for display options',
    },
    arrowConnections: {
      description: 'Arrow connections configuration',
    },
    debug: {
      description: 'Show debug information',
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    wisdomUnits: sampleWisdomUnits,
    componentOrder: componentOrder,
    preferences: {
      whitesOnly: false,
      TsOnly: false,
      isWhiteOutside: false,
      showFlow: true,
      graphView: false
    },
    colors: {
      userRingColors: {
        negative: "#F9C6CC",
        neutral: "#ffffff",
        positive: "#C6E5B3"
      },
      userTextColors: {
        negative: "#8b1538",
        neutral: "#333",
        positive: "#2d5a2d",
        coordinates: "#333"
      },
      userHubColor: "#ffff7a"
    },
    arrowConnections: '',
    debug: true,
    onChartReady: (chart) => {
      console.log('Chart ready:', chart);
    },
    onTopSliceChange: (slice) => {
      console.log('Top slice changed:', slice);
    },
    onFocusedSliceChange: (slice) => {
      console.log('Focused slice changed:', slice);
    },
    onClickedCellChange: (cell) => {
      console.log('Clicked cell changed:', cell);
    }
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: {
      userRingColors: {
        negative: "#F9C6CC",
        neutral: "#ffffff",
        positive: "#C6E5B3"
      },
      userTextColors: {
        negative: "#8b1538",
        neutral: "#333",
        positive: "#2d5a2d",
        coordinates: "#333"
      },
      userHubColor: "#ffff7a"
    },
  },
};

export const WhitesOnly: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: true,
      TsOnly: false,
      isWhiteOutside: false,
      showFlow: true,
      graphView: false
    },
  },
};

export const TsOnly: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: false,
      TsOnly: true,
      isWhiteOutside: false,
      showFlow: true,
      graphView: false
    },
  },
};

export const AsOnly: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: false,
      TsOnly: false,
      AsOnly: true,
      isWhiteOutside: false,
      showFlow: true,
      graphView: false
    },
  },
};

export const SwappedColors: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: false,
      TsOnly: false,
      isWhiteOutside: true,
      showFlow: true,
      graphView: false
    },
  },
};

export const ShowFlow: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: false,
      TsOnly: false,
      isWhiteOutside: false,
      showFlow: true,
      graphView: false
    },
  },
};

export const DynamicFlowToggle: Story = {
  render: (args) => {
    const [showFlow, setShowFlow] = React.useState(true);
    const [chart, setChart] = React.useState<any>(null);
    
    const toggleFlow = () => {
      setShowFlow(!showFlow);
    };
    
    return (
      <div>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={toggleFlow}
            style={{
              padding: '8px 16px',
              backgroundColor: showFlow ? '#007bff' : '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {showFlow ? 'Hide Flow' : 'Show Flow'}
          </button>
          {chart && (
            <span style={{ marginLeft: '10px', fontSize: '14px', color: '#666' }}>
              Chart methods available: {Object.keys(chart).filter(k => typeof chart[k] === 'function').join(', ')}
            </span>
          )}
        </div>
        <DialecticalWheel
          {...args}
          preferences={{
            ...args.preferences,
            showFlow: showFlow
          }}
          onChartReady={(chartInstance) => {
            console.log('Chart ready with methods:', Object.keys(chartInstance).filter(k => typeof chartInstance[k] === 'function'));
            setChart(chartInstance);
          }}
        />
      </div>
    );
  },
  args: {
    ...Default.args,
  },
};

export const WithArrowConnections: Story = {
  args: {
    ...Default.args,
    arrowConnections: `
      ${sampleWisdomUnits.map((unit) => `${unit.t.alias} -> ${unit.a.alias}`).join('\n')}
    `,
  },
};

export const GraphView: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: false,
      TsOnly: false,
      isWhiteOutside: false,
      showFlow: true,
      graphView: true
    },
  },
};

export const GraphViewAsOnly: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: false,
      TsOnly: false,
      AsOnly: true,
      isWhiteOutside: false,
      showFlow: false,
      graphView: true
    },
  },
};

export const GraphViewTsOnly: Story = {
  args: {
    ...Default.args,
    preferences: {
      whitesOnly: false,
      TsOnly: true,
      AsOnly: false,
      isWhiteOutside: false,
      showFlow: false,
      graphView: true
    },
  },
};


