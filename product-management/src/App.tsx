import React, { useState } from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import Calculator from './Calculator';
import Product from './Product';

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: number;
  status: 'Đã hoàn thành' | 'Đang xử lý' | 'Đã hủy';
  date: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  ordersCount: number;
}

const App: React.FC = () => {
  const menuItems = [
    { name: 'Trang chủ', path: '/trang-chu' },
    { name: 'Sản phẩm', path: '/san-pham' },
    { name: 'Đơn hàng', path: '/don-hang' },
    { name: 'Máy tính', path: '/may-tinh' },
    { name: 'Khách hàng', path: '/khach-hang' },
    { name: 'Cài đặt', path: '/cai-dat' },
  ];

  const products = [
    {
      name: 'OPPO Find X9 Ultra',
      price: 29990000,
      img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'OPPO Find X9 Pro',
      price: 24990000,
      img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'OPPO Find X9 Thường',
      price: 18990000,
      img: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop&q=80',
    },
    {
      name: 'OnePlus 15',
      price: 21490000,
      img: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=500&auto=format&fit=crop&q=80',
    },
  ];

  // State Quản lý Đơn hàng
  const [orders, setOrders] = useState<Order[]>([
    { id: 'DH-001', customer: 'Nguyễn Văn An', product: 'OPPO Find X9 Ultra', amount: 29990000, status: 'Đã hoàn thành', date: '03/10/2026' },
    { id: 'DH-002', customer: 'Trần Thị Mai', product: 'OPPO Find X9 Pro', amount: 24990000, status: 'Đang xử lý', date: '03/10/2026' },
    { id: 'DH-003', customer: 'Lê Hoàng Nam', product: 'OnePlus 15', amount: 21490000, status: 'Đang xử lý', date: '02/10/2026' },
  ]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    customer: '',
    product: 'OPPO Find X9 Ultra',
    amount: 29990000,
  });

  // State Quản lý Khách hàng
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'KH-01', name: 'Nguyễn Văn An', phone: '0901 234 567', email: 'an.nguyen@gmail.com', ordersCount: 3 },
    { id: 'KH-02', name: 'Trần Thị Mai', phone: '0912 345 678', email: 'mai.tran@gmail.com', ordersCount: 1 },
    { id: 'KH-03', name: 'Lê Hoàng Nam', phone: '0988 777 666', email: 'nam.le@gmail.com', ordersCount: 2 },
  ]);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '' });

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.customer.trim()) return alert('Vui lòng nhập tên khách hàng');
    const created: Order = {
      id: `DH-00${orders.length + 1}`,
      customer: newOrder.customer,
      product: newOrder.product,
      amount: Number(newOrder.amount),
      status: 'Đang xử lý',
      date: new Date().toLocaleDateString('vi-VN'),
    };
    setOrders([created, ...orders]);
    setIsOrderModalOpen(false);
    setNewOrder({ customer: '', product: 'OPPO Find X9 Ultra', amount: 29990000 });
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name.trim()) return alert('Vui lòng nhập tên khách hàng');
    const created: Customer = {
      id: `KH-0${customers.length + 1}`,
      name: newCustomer.name,
      phone: newCustomer.phone,
      email: newCustomer.email,
      ordersCount: 0,
    };
    setCustomers([...customers, created]);
    setIsCustomerModalOpen(false);
    setNewCustomer({ name: '', phone: '', email: '' });
  };

  return (
    <div style={styles.container}>
      {/* SIDEBAR BÊN TRÁI */}
      <div style={styles.sidebar}>
        <div style={styles.headerTitle}>HỆ THỐNG</div>
        <ul style={styles.menuList}>
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  ...styles.menuItem,
                  ...(isActive ? styles.activeMenuItem : {}),
                })}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* VÙNG NỘI DUNG TOÀN MÀN HÌNH BÊN PHẢI */}
      <div style={styles.content}>
        <Routes>
          <Route path="/" element={<Navigate to="/trang-chu" replace />} />

          {/* TRANG CHỦ */}
          <Route
            path="/trang-chu"
            element={
              <div style={styles.pageWrapper}>
                <h2 style={styles.contentTitle}>Tổng quan Hệ thống</h2>
                <div style={styles.statGrid}>
                  <div style={styles.statCard}>
                    <p style={styles.statLabel}>Tổng doanh thu</p>
                    <h3 style={styles.statNumber}>76,470,000 VNĐ</h3>
                  </div>
                  <div style={styles.statCard}>
                    <p style={styles.statLabel}>Đơn hàng đã đặt</p>
                    <h3 style={styles.statNumber}>{orders.length} đơn</h3>
                  </div>
                  <div style={styles.statCard}>
                    <p style={styles.statLabel}>Tổng khách hàng</p>
                    <h3 style={styles.statNumber}>{customers.length} người</h3>
                  </div>
                </div>
              </div>
            }
          />

          {/* TRANG SẢN PHẨM */}
          <Route
            path="/san-pham"
            element={
              <div style={styles.pageWrapper}>
                <h2 style={styles.contentTitle}>Danh sách Sản phẩm</h2>
                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' }}>
                  {products.map((item, index) => (
                    <Product key={index} name={item.name} price={item.price} img={item.img} />
                  ))}
                </div>
              </div>
            }
          />

          {/* TRANG ĐƠN HÀNG (MỞ MODAL) */}
          <Route
            path="/don-hang"
            element={
              <div style={styles.pageWrapper}>
                <div style={styles.pageHeader}>
                  <h2 style={styles.contentTitle}>Quản lý Đơn hàng</h2>
                  <button style={styles.primaryButton} onClick={() => setIsOrderModalOpen(true)}>
                    + Tạo đơn hàng mới
                  </button>
                </div>

                <div style={styles.card}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.thRow}>
                        <th style={styles.th}>Mã ĐH</th>
                        <th style={styles.th}>Khách hàng</th>
                        <th style={styles.th}>Sản phẩm</th>
                        <th style={styles.th}>Tổng tiền</th>
                        <th style={styles.th}>Ngày tạo</th>
                        <th style={styles.th}>Trạng thái</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((o) => (
                        <tr key={o.id} style={styles.tr}>
                          <td style={{ ...styles.td, fontWeight: 'bold' }}>{o.id}</td>
                          <td style={styles.td}>{o.customer}</td>
                          <td style={styles.td}>{o.product}</td>
                          <td style={{ ...styles.td, color: '#dc2626', fontWeight: 'bold' }}>
                            {o.amount.toLocaleString()} VNĐ
                          </td>
                          <td style={styles.td}>{o.date}</td>
                          <td style={styles.td}>
                            <span
                              style={{
                                ...styles.badge,
                                backgroundColor: o.status === 'Đã hoàn thành' ? '#dcfce7' : '#fef9c3',
                                color: o.status === 'Đã hoàn thành' ? '#15803d' : '#854d0e',
                              }}
                            >
                              {o.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />

          {/* TRANG MÁY TÍNH */}
          <Route
            path="/may-tinh"
            element={
              <div style={styles.pageWrapper}>
                <h2 style={styles.contentTitle}>Máy tính</h2>
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                  <Calculator />
                </div>
              </div>
            }
          />

          {/* TRANG KHÁCH HÀNG (MỞ MODAL) */}
          <Route
            path="/khach-hang"
            element={
              <div style={styles.pageWrapper}>
                <div style={styles.pageHeader}>
                  <h2 style={styles.contentTitle}>Danh sách Khách hàng</h2>
                  <button style={styles.primaryButton} onClick={() => setIsCustomerModalOpen(true)}>
                    + Thêm khách hàng
                  </button>
                </div>

                <div style={styles.card}>
                  <table style={styles.table}>
                    <thead>
                      <tr style={styles.thRow}>
                        <th style={styles.th}>Mã KH</th>
                        <th style={styles.th}>Họ và tên</th>
                        <th style={styles.th}>Số điện thoại</th>
                        <th style={styles.th}>Email</th>
                        <th style={styles.th}>Số đơn hàng</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map((c) => (
                        <tr key={c.id} style={styles.tr}>
                          <td style={{ ...styles.td, fontWeight: 'bold' }}>{c.id}</td>
                          <td style={styles.td}>{c.name}</td>
                          <td style={styles.td}>{c.phone}</td>
                          <td style={styles.td}>{c.email}</td>
                          <td style={styles.td}>{c.ordersCount} đơn</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            }
          />

          {/* TRANG CÀI ĐẶT (FULL TOÀN MÀN HÌNH, KHÔNG BỊ TRẮNG BÊN PHẢI) */}
          <Route
            path="/cai-dat"
            element={
              <div style={styles.pageWrapper}>
                <h2 style={styles.contentTitle}>Cài đặt hệ thống</h2>
                <div style={{ ...styles.card, padding: '28px', marginTop: '20px' }}>
                  <div style={{ marginBottom: '18px' }}>
                    <label style={styles.label}>Tên cửa hàng</label>
                    <input style={styles.input} defaultValue="Cửa hàng Điện thoại Công nghệ" />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={styles.label}>Email quản trị</label>
                    <input style={styles.input} defaultValue="admin@cuahang.com" />
                  </div>
                  <button style={styles.primaryButton} onClick={() => alert('Đã lưu cấu hình thành công!')}>
                    Lưu thay đổi
                  </button>
                </div>
              </div>
            }
          />
        </Routes>
      </div>

      {/* MODAL TẠO ĐƠN HÀNG */}
      {isOrderModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Tạo Đơn Hàng Mới</h3>
              <button style={styles.closeBtn} onClick={() => setIsOrderModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddOrder}>
              <div style={{ marginBottom: '14px' }}>
                <label style={styles.label}>Tên khách hàng:</label>
                <input
                  required
                  placeholder="Nhập tên khách..."
                  style={styles.input}
                  value={newOrder.customer}
                  onChange={(e) => setNewOrder({ ...newOrder, customer: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={styles.label}>Chọn sản phẩm:</label>
                <select
                  style={styles.input}
                  value={newOrder.product}
                  onChange={(e) => {
                    const sel = products.find((p) => p.name === e.target.value);
                    setNewOrder({
                      ...newOrder,
                      product: e.target.value,
                      amount: sel ? sel.price : 20000000,
                    });
                  }}
                >
                  {products.map((p) => (
                    <option key={p.name} value={p.name}>{p.name}</option>
                  ))}
                </select>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={styles.label}>Số tiền (VNĐ):</label>
                <input
                  type="number"
                  style={styles.input}
                  value={newOrder.amount}
                  onChange={(e) => setNewOrder({ ...newOrder, amount: Number(e.target.value) })}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" style={styles.cancelBtn} onClick={() => setIsOrderModalOpen(false)}>Hủy</button>
                <button type="submit" style={styles.primaryButton}>Xác nhận đặt hàng</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL THÊM KHÁCH HÀNG */}
      {isCustomerModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBox}>
            <div style={styles.modalHeader}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Thêm Khách Hàng Mới</h3>
              <button style={styles.closeBtn} onClick={() => setIsCustomerModalOpen(false)}>✕</button>
            </div>
            <form onSubmit={handleAddCustomer}>
              <div style={{ marginBottom: '14px' }}>
                <label style={styles.label}>Họ và tên:</label>
                <input
                  required
                  placeholder="Nhập họ tên..."
                  style={styles.input}
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={styles.label}>Số điện thoại:</label>
                <input
                  placeholder="09xx xxx xxx"
                  style={styles.input}
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={styles.label}>Email:</label>
                <input
                  placeholder="email@example.com"
                  style={styles.input}
                  value={newCustomer.email}
                  onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button type="button" style={styles.cancelBtn} onClick={() => setIsCustomerModalOpen(false)}>Hủy</button>
                <button type="submit" style={styles.primaryButton}>Thêm khách hàng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    width: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    textAlign: 'left',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#1f2430',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
  },
  headerTitle: {
    padding: '24px 20px 12px 20px',
    fontSize: '13px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  menuItem: {
    display: 'block',
    padding: '12px 24px',
    fontSize: '14px',
    cursor: 'pointer',
    color: '#cbd5e1',
    textDecoration: 'none',
    transition: 'background-color 0.2s, color 0.2s',
  },
  activeMenuItem: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    width: '100%',
    backgroundColor: '#e2e8f0', // Nền xám bao trọn toàn bộ bên phải
    padding: '30px 40px',
    overflowY: 'auto',
    height: '100vh',
    boxSizing: 'border-box',
    textAlign: 'left',
  },
  pageWrapper: {
    width: '100%',
    textAlign: 'left',
  },
  contentTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#1e293b',
    margin: '0 0 20px 0',
    textAlign: 'left',
  },
  pageHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    width: '100%',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
  },
  cancelBtn: {
    backgroundColor: '#cbd5e1',
    color: '#334155',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '20px',
    width: '100%',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  },
  statLabel: {
    fontSize: '14px',
    color: '#64748b',
    margin: 0,
  },
  statNumber: {
    fontSize: '24px',
    color: '#0f172a',
    margin: '8px 0 0 0',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  thRow: {
    backgroundColor: '#f8fafc',
    borderBottom: '1px solid #e2e8f0',
  },
  th: {
    padding: '14px 18px',
    fontSize: '13px',
    color: '#475569',
    fontWeight: '600',
  },
  tr: {
    borderBottom: '1px solid #f1f5f9',
  },
  td: {
    padding: '14px 18px',
    fontSize: '14px',
    color: '#334155',
  },
  badge: {
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modalBox: {
    backgroundColor: '#ffffff',
    padding: '24px',
    borderRadius: '8px',
    width: '420px',
    maxWidth: '90%',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#94a3b8',
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: '600',
    color: '#334155',
    marginBottom: '6px',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '14px',
    boxSizing: 'border-box',
    display: 'block',
  },
};

export default App;