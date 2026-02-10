export default function AsideComponent ({ isOpen, onClose }) {
  return <div style={{ display: isOpen ? 'block' : 'none' }}></div>
}
