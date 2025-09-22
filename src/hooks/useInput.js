import { useState } from 'react';

export default function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);
  const onChange = (e) => setValue(e.target.value);
  const reset = () => setValue('');
  return { value, onChange, reset, setValue };
}
