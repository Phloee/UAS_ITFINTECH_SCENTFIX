import './Footer.css';

export function Footer({ noMargin, noButton }) {
  return (
    <footer style={{ marginTop: noMargin ? '0' : '20rem' }}>
      {/* footer-divider hilang jika noButton true */}
      {!noButton && <div className="footer-divider"></div>}

      {/* back-to-home hilang jika noButton true */}
      {!noButton && (
        <div className="back-to-home">
          <a href="/">Back to Home Page</a>
        </div>
      )}

      <div className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <img src="/footer/logo.svg" alt="Kumalawati Logo" />
              <h3 className="footer-brand-name">Kumalawati.co</h3>
            </div>
            <div className="footer-info">
              <p className="footer-description">Informasi lebih lanjut : Produk, Informasi Perusahaan,
                dan
                Marketing Plan</p>
              <div className="footer-contact">
                <img src="/footer/call.svg" alt="Phone" />
                <span className="footer-phone">0853-2570-0925</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom-divider"></div>

        <div className="footer-copyright">
          <img src="/footer/copyright.svg" alt="Copyright" />
          <span className="footer-copyright-text">2025 Kumalawati. Semua hak cipta dilindungi
            undang-undang.</span>
        </div>
      </div>
    </footer>
  );
}