import styled from 'styled-components'


export default function ErrorMessage({ message }) {
  return (
    <Aside>
      {message}
    </Aside>
  )
}

const Aside = styled.aside(props => ({
  padding: "1.5em",
  fontSize: "14px",
  color: "white",
  backgroundColor: "red",
}));
