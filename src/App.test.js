import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("Log In button and screen disappears when logged in", () => {
  const result = render(<App />);
  
  const logInScreenElement = screen.queryByRole('login');
  const logInButtonElement = screen.getByText("Log In");
  expect(logInScreenElement).toBeInTheDocument();
  
  const textElement = screen.getByPlaceholderText('Enter username')
  fireEvent.change(textElement, { target: { value: 'someones username' } });
  
  fireEvent.click(logInButtonElement);
  expect(logInScreenElement).toBeInTheDocument();
  expect(logInButtonElement).toBeInTheDocument();

});

test("Check for board rendering when logged in", () => {
  //const wrapper = shallow(<App />);
  const result = render(<App />);
  
  const logInScreenElement = screen.queryByRole("login")
  expect(logInScreenElement).toBeInTheDocument();
  
  const textElement = screen.getByPlaceholderText('Enter username')
  fireEvent.change(textElement, { target: { value: 'someones username' } });
  
  const enterButtonElement = screen.getByText('Log In');
  expect(enterButtonElement).toBeInTheDocument();
  fireEvent.click(enterButtonElement);
  
  const board = screen.queryByRole('board');
  expect(board).toBeInTheDocument();
  
});


test("Check for leaderboard upon entrance to game", () => {
  const result = render(<App />);
  
  const textElement = screen.getByPlaceholderText('Enter username')
  fireEvent.change(textElement, { target: { value: 'some username' } });
  
  const enterButtonElement = screen.getByText('Log In');
  expect(enterButtonElement).toBeInTheDocument();
  fireEvent.click(enterButtonElement);
  
  const board = screen.queryByRole('board');
  expect(board).toBeInTheDocument();
  
  const leaderboard = screen.queryByRole('leaderboard');
  expect(leaderboard).toBeInTheDocument();
  
});

