import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders log in screen", () => {
  const result = render(<App />);
  
  const logInButtonElement = screen.getByText('Log In');
  expect(logInButtonElement).toBeInTheDocument();

  fireEvent.click(logInButtonElement);
  expect(logInButtonElement).toBeInTheDocument();

});

test("Check for the first click on board as X", () => {
  //const wrapper = shallow(<App />);
  const result = render(<App />);
  
  const textElement = screen.getByPlaceholderText('Enter username')
  fireEvent.change(textElement, { target: { value: 'someones username' } });
  
  const enterButtonElement = screen.getByText('Log In');
  expect(enterButtonElement).toBeInTheDocument();
  fireEvent.click(enterButtonElement);
  
  const board = screen.queryByRole('board');
  expect(board).toBeInTheDocument();
  
});


test("Check for correct userlist", () => {
  const result = render(<App />);
  
  const textElement = screen.getByPlaceholderText('Enter username')
  fireEvent.change(textElement, { target: { value: 'some username' } });
  
  const enterButtonElement = screen.getByText('Log In');
  expect(enterButtonElement).toBeInTheDocument();
  fireEvent.click(enterButtonElement);
  
  const playerXElement = screen.getByText('X')
  expect(PlayerXElement).toBeInTheDocument();
  
  const playerOElement = screen.getByText('O')
  expect(PlayerOElement).toBeInTheDocument();
  
  const spectatorsElement = screen.getByText('Spectators')
  expect(spectatorsElement).toBeInTheDocument();
  
});