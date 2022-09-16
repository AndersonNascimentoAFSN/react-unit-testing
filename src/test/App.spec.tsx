import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "../App";

describe("App", () => {
  it("should have a title", () => {
    const { debug, getByRole } = render(<App />);

    const app = getByRole("heading", {
      name: /family/i,
    });

    expect(app).toBeInTheDocument();
    // debug();
  });

  it("should button and input in the screen", () => {
    const { getByRole } = render(<App />);

    const button = getByRole("button", {
      name: /add people/i,
    });
    expect(button).toBeInTheDocument();

    const input = getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("should write name people in the input", async () => {
    const { getByRole } = render(<App />);
    const input = getByRole("textbox");
    await userEvent.type(input, "Anderson");
    expect(input).toHaveValue("Anderson");
  });

  it("should add people in list and clear input", async () => {
    const { getByRole } = render(<App />);

    const button = getByRole("button", {
      name: /add people/i,
    });

    const input = getByRole("textbox");

    // fireEvent.change(input, { target: { value: "Anderson" } });
    await userEvent.type(input, "Anderson");

    expect(input).toHaveValue("Anderson");

    await userEvent.click(button);

    expect(input).toHaveValue("");

    const item = getByRole("listitem");

    expect(item).toHaveTextContent("Anderson");
  });
});
