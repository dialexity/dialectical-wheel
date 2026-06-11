import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import DialecticalWheel from '../components/DialecticalWheel';

const sampleWisdomUnits = [
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

const meta: Meta<typeof DialecticalWheel> = {
  title: 'Components/DialecticalWheel',
  component: DialecticalWheel,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    wisdomUnits: sampleWisdomUnits,
    debug: true,
    onTopSliceChange: (slice) => console.log('Top slice:', slice),
    onClickedCellChange: (cell) => console.log('Clicked cell:', cell),
  },
};

export const WhiteOutside: Story = {
  args: {
    ...Default.args,
    isWhiteOutside: true,
  },
};

export const TwoUnits: Story = {
  args: {
    ...Default.args,
    wisdomUnits: sampleWisdomUnits.slice(0, 2),
  },
};

export const CustomColors: Story = {
  args: {
    ...Default.args,
    colors: {
      userRingColors: { negative: '#E8D5E0', neutral: '#F5F5DC', positive: '#D4E8D0' },
      userTextColors: { negative: '#5C2D4F', neutral: '#4A4A2E', positive: '#2D5A2D', coordinates: '#333' },
      userHubColor: '#FFD700',
    },
  },
};

export const WithComponentOrder: Story = {
  args: {
    ...Default.args,
    componentOrder: ['T', 'T2', 'T3', 'A4', 'A', 'A2', 'A3', 'T4'],
  },
};
