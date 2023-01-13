import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  max-width: 600px;

  h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 32px;
    text-align: center;
  }
`

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const Buttons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`

export default { Form, Buttons, Container }
