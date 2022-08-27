export default function Iframed(props) {
  return (
    <iframe src={`http://localhost:3000?sid=${props.sid}`} />
  )
}
