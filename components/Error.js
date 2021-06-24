const Error = ({ children }) => {
  return (
    <aside
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        padding: 32,
        backgroundColor: 'red',
      }}
    >
      {children}
    </aside>
  );
};

export default Error;
