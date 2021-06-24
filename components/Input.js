const Input = ({ name, label, value, onChange }) => {
  return (
    <label style={{ display: 'block' }}>
      {label}
      <input name={name} value={value || ''} onChange={onChange} />
    </label>
  );
};

export default Input;
