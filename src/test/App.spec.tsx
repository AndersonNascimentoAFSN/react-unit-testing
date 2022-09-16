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

  it("should be able to add people in the list and clear input", async () => {
    const { getByRole, findByRole } = render(<App />);

    const button = getByRole("button", {
      name: /add people/i,
    });

    const input = getByRole("textbox");

    // fireEvent.change(input, { target: { value: "Anderson" } });
    await userEvent.type(input, "Anderson");

    expect(input).toHaveValue("Anderson");

    await userEvent.click(button);

    expect(input).toHaveValue("");

    // const item = await findByRole("listitem"); // exemplo com find

    const item = getByRole("listitem");

    expect(item).toHaveTextContent("Anderson");
  });

  it("should be able to  remove peoples from the list", async () => {
    const { getByRole, queryByRole } = render(<App />);

    const input = getByRole("textbox");
    await userEvent.type(input, "Anderson");

    const buttonAdd = getByRole("button", {
      name: /add people/i,
    });
    await userEvent.click(buttonAdd);

    const item = getByRole("listitem");
    expect(item).toHaveTextContent("Anderson");


    const buttonRemove = getByRole("button", {
      name: /remove people/i,
    });
    await userEvent.click(buttonRemove);


    const itemRemoved = queryByRole("listitem"); // uso do query
    expect(itemRemoved).not.toBeInTheDocument();
  });
});
