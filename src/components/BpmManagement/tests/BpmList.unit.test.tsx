import { render, screen } from "@testing-library/react";
import { AppProviders } from "../../../app/appProvider";
import BpmList from "./BpmList";



jest.mock('@/hooks/useBpmList', () => ({
  useBpmList: () => ({
    data: { rows: [{id:1,onvan:"عنوان1",nameSabtKonande:"علی",tarikhSabt:"1402/01/01"}], total:1 },
    isLoading: false,
    isFetching: false,
    isError: false,
    refetch: jest.fn(),
  }),
}));

jest.mock('@/hooks/useMutations', () => ({
  useBpmMutations: () => ({
    addMutation:{mutate: jest.fn()},
    updateMutation:{mutate: jest.fn()},
    deleteMutation:{mutate: jest.fn()},
  }),
}));

test("renders DataGrid row", async () => {
  render(  <AppProviders><BpmList getSelectedRows={jest.fn()} /></AppProviders>);
  expect(await screen.findByText("عنوان1")).toBeInTheDocument();
});
