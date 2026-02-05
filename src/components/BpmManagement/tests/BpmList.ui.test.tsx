import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "@/mocks/server";
import { rest } from "msw";
import BpmList from "./BpmList";
import userEvent from "@testing-library/user-event";

// Start/Stop MSW
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithClient = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BpmList getSelectedRows={jest.fn()} />
    </QueryClientProvider>
  );
};

test("open SabteMoshtari modal and submit adds a row", async () => {
  renderWithClient();

  const addButton = await screen.findByTitle("افزودن");
  fireEvent.click(addButton);

  // فرض کنیم SabteMoshtari modal باز شده
  const nameInput = screen.getByLabelText(/نام مشتری/i); // فرض label فرم
  const onvanInput = screen.getByLabelText(/عنوان/i);

  await userEvent.type(nameInput, "حسین");
  await userEvent.type(onvanInput, "عنوان جدید");

  const submitButton = screen.getByRole("button", { name: /ثبت/i });
  fireEvent.click(submitButton);

  // انتظار اضافه شدن row جدید به DataGrid
  await waitFor(() => {
    expect(screen.getByText("عنوان جدید")).toBeInTheDocument();
    expect(screen.getByText("حسین")).toBeInTheDocument();
  });

  // Snackbars success
  expect(screen.getByText(/عملیات با موفقیت انجام شد/i)).toBeInTheDocument();
});

test("delete a row via action button", async () => {
  renderWithClient();

  // فرض کنیم row اولیه موجود است
  const trashButtons = await screen.findAllByRole("button", { name: /trash/i });
  fireEvent.click(trashButtons[0]);

  await waitFor(() => {
    expect(screen.queryByText("عنوان1")).not.toBeInTheDocument();
  });

  expect(screen.getByText(/عملیات با موفقیت انجام شد/i)).toBeInTheDocument();
});

test("multi-row selection and returnSelectedRows callback", async () => {
  const getSelectedRowsMock = jest.fn();
  render(
    <QueryClientProvider client={new QueryClient()}>
      <BpmList getSelectedRows={getSelectedRowsMock} />
    </QueryClientProvider>
  );

  // select all checkbox
  const headerCheckbox = screen.getByRole("checkbox", { name: "" });
  fireEvent.click(headerCheckbox);

  const returnButton = screen.getByTitle("افزودن");
  fireEvent.click(returnButton);

  await waitFor(() => {
    expect(getSelectedRowsMock).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ onvan: "عنوان1" }),
        expect.objectContaining({ onvan: "عنوان2" }),
      ])
    );
  });
});

test("displays error snackbar on server error", async () => {
  server.use(
    rest.post("*/farayand", (req, res, ctx) => res(ctx.status(500)))
  );

  renderWithClient();

  const addButton = await screen.findByTitle("افزودن");
  fireEvent.click(addButton);

  const submitButton = screen.getByRole("button", { name: /ثبت/i });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText(/خطا رخ داد/i)).toBeInTheDocument();
  });
});
