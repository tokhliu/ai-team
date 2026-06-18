'use client';

import UnitConverterLayout from './UnitConverterLayout';
import {
  LENGTH_UNITS, WEIGHT_UNITS, TEMPERATURE_UNITS, AREA_UNITS,
  DATA_SIZE_UNITS, TIME_UNITS, type UnitDef,
} from '@/lib/tools/unit-converter/conversions';
import DataSizeConverterTool from './DataSizeConverterTool';

export type UnitCategory = 'length' | 'weight' | 'temperature' | 'area' | 'data-size' | 'time';

const UNIT_MAP: Record<string, { units: UnitDef[]; defaultUnitId: string }> = {
  length:      { units: LENGTH_UNITS,      defaultUnitId: 'm' },
  weight:      { units: WEIGHT_UNITS,      defaultUnitId: 'kg' },
  temperature: { units: TEMPERATURE_UNITS, defaultUnitId: 'c' },
  area:        { units: AREA_UNITS,        defaultUnitId: 'm2' },
  time:        { units: TIME_UNITS,        defaultUnitId: 's' },
};

interface Props {
  category: UnitCategory;
}

export default function UnitConverterClient({ category }: Props) {
  if (category === 'data-size') return <DataSizeConverterTool />;
  const { units, defaultUnitId } = UNIT_MAP[category];
  return <UnitConverterLayout units={units} defaultUnitId={defaultUnitId} />;
}
