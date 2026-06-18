'use client';

import { useState } from 'react';
import UnitConverterLayout from './UnitConverterLayout';
import { DATA_SIZE_UNITS, DATA_SIZE_UNITS_DECIMAL } from '@/lib/tools/unit-converter/conversions';

export default function DataSizeConverterTool() {
  const [isBinary, setIsBinary] = useState(true);
  const units = isBinary ? DATA_SIZE_UNITS : DATA_SIZE_UNITS_DECIMAL;

  const toggle = (
    <button
      onClick={() => setIsBinary(b => !b)}
      className="px-3 py-2 text-xs border border-border rounded text-text-secondary hover:border-border-hover hover:text-text-primary transition-colors"
    >
      {isBinary ? '二進制 (1024)' : '十進制 (1000)'}
    </button>
  );

  return <UnitConverterLayout units={units} defaultUnitId="mb" extraControls={toggle} />;
}
