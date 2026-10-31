import Button from './Button';

interface ProductProps {
  name: string;
  price: number;
  img: string;
}

function Product({ name, price, img }: ProductProps) {
  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        width: '220px',
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        margin: '10px',
      }}
    >
      <img
        src={img}
        alt={name}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <h3 style={{ margin: '10px 0 5px' }}>{name}</h3>
      <p style={{ color: '#e63946', fontWeight: 'bold', margin: '0 0 10px' }}>
        {price.toLocaleString()} VNĐ
      </p>
      {/* Sử dụng component Button với prop text như yêu cầu */}
      <Button text="Mua ngay" />
    </div>
  );
}

export default Product;