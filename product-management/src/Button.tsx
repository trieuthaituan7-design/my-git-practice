interface ButtonProps {
    text: string;
  }
  
  function Button({ text }: ButtonProps) {
    return (
      <button
        style={{
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {text}
      </button>
    );
  }
  
  export default Button;