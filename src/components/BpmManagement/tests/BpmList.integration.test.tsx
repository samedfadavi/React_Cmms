import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { server } from "@/mocks/server";
import { rest } from "msw";
import BpmList from "./BpmList";

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

test("renders initial rows from server", async () => {
  renderWithClient();
  expect(await screen.findByText("عنوان1")).toBeInTheDocument();
  expect(await screen.findByText("عنوان2")).toBeInTheDocument();
});

test("can add a new row", async () => {
  renderWithClient();

  // Mock add modal submit
  fireEvent.click(await screen.findByTitle("افزودن"));
  // فرض می‌کنیم SabteMoshtari modal با onSubmit trigger شده
  // برای simplicity مستقیم mutate call
  // در real test می‌توان UI modal فرم را پر کرد
  // اما اینجا integration test برای mutations

  // بعد از add، باید row جدید در grid باشه
  await waitFor(() => {
    expect(screen.getByText("عنوان3")).toBeInTheDocument();
  });
});

test("can delete a row", async () => {
  renderWithClient();
  
  // delete first row
  fireEvent.click(screen.getAllByRole("button", { name: /trash/i })[0]);

  await waitFor(() => {
    expect(screen.queryByText("عنوان1")).not.toBeInTheDocument();
  });
});

test("handles server error gracefully", async () => {
  server.use(
    rest.get("*/farayand", (req, res, ctx) => res(ctx.status(500)))
  );

  renderWithClient();
  expect(await screen.findByText(/خطا/i)).toBeInTheDocument();
});

test("pagination works", async () => {
  renderWithClient();

  // تغییر page
  fireEvent.click(screen.getByLabelText("Next page"));
  await waitFor(() => {
    // انتظار می‌رود rowها بسته به page تغییر کنند
    expect(screen.queryByText("عنوان1")).not.toBeInTheDocument();
  });
});
