import styled from 'styled-components';

export const MainContainer = styled.div`
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro:regular,bold,italic&subset=latin,latin-ext');

  font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  height: 100vh;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Container = styled.div`
  flex: 1;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const InputCounterContainer = styled.div`
  & > span{
    color: #353b46;
    font-size: 20px;
  };
  margin-left: auto;
  margin-right: 20px;
  display: flex;
  align-items: baseline;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
  background-color: #dddee1;
  color:  #FFFFFF;
  min-height: 70px;
`;

export const Title = styled.h2`
  margin: 0;
  padding: 20px;
  font-weight: normal;
  color: #353b46;
`;

export const Warning = styled.div`
  color: red; 
  display: ${(props) => (props.show ? 'flex' : 'none')};
  align-items: baseline;
  justify-content: space-around;
  width: 250px;
  margin: 0 20px;
`;

export const Button = styled.button`
  padding: 10px 5px;
  margin: 15px 0 0 40px;
  color: white;
  font-size: 14px;
  font-weight: 700;
  background-color: #017eff;
  border: 0px;
  border-radius: 3px;
  appearance: none;
  cursor: pointer;
  display:inline-block;
  :disabled {
    cursor: not-allowed;
    pointer-events: none;
    background-color: grey;
  }
`;

export const TrimButton = styled(Button)`
  margin: 0;
`;
