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

const defaultStyles = {
  ringColors: { negative: '#F9C6CC', neutral: '#ffffff', positive: '#C6E5B3' },
  textColors: { negative: '#8b1538', neutral: '#333333', positive: '#2d5a2d', coordinates: '#333333' },
  hubColor: '#ffff7a',
  maxFontSize: 14,
  ringStyles: {
    positive: { maxFontSize: 14, padding: 0.05, textBias: 0.25 },
    negative: { maxFontSize: 14, padding: 0.05, textBias: 0 },
    neutral: { maxFontSize: 14, padding: 0.05, textBias: 0 },
  },
  coordinateLabelSize: 12,
  strokeWidth: 1,
  strokeColor: '#000',
};

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
    styles: defaultStyles,
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
    styles: {
      ringColors: { negative: '#E8D5E0', neutral: '#F5F5DC', positive: '#D4E8D0' },
      textColors: { negative: '#5C2D4F', neutral: '#4A4A2E', positive: '#2D5A2D', coordinates: '#333' },
      hubColor: '#FFD700',
    },
  },
};

export const WithComponentOrder: Story = {
  args: {
    ...Default.args,
    componentOrder: ['T', 'T2', 'T3', 'A4', 'A', 'A2', 'A3', 'T4'],
  },
};

const longTextWisdomUnits = [
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
    wisdomUnits: longTextWisdomUnits,
  },
};
