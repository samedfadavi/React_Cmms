import { render, screen } from "@testing-library/react";
import { BpmList } from "../BpmList";
import { AppProviders } from "@/app/AppProviders";

describe("BpmList – Unit Test", () => {
  it("renders grid rows", async () => {
    render(
      <AppProviders>
        <BpmList />
      </AppProviders>
    );

    expect(await screen.findByText("Ali")).toBeInTheDocument();
  });
});
