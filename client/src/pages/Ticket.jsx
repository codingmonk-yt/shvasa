import { Button, Container, Stack } from "@mui/material";
import Page from "../components/Page";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../components/search";
import { useEffect, useState } from "react";
import { AddTicket, TicketTable } from "../section/ticket";
import { useDispatch } from "react-redux";
import { getTickets } from "../redux/slices/ticket";
import { debounce } from "lodash";

const Agent = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const toggleForm = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const dispatchAction = () => {
      // Your dispatch logic here
      dispatch(getTickets(text));
    };
    const debouncedDispatch = debounce(dispatchAction, 500);

    debouncedDispatch();

    return () => debouncedDispatch.cancel(); // Clean up the debounced function on component unmount
  }, [text]);

  return (
    <Page title="Support Ticket">
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass />
              </SearchIconWrapper>
              <StyledInputBase
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
            <Button
              onClick={toggleForm}
              startIcon={<Plus />}
              variant="contained"
            >
              Add Ticket
            </Button>
          </Stack>
          <TicketTable />
        </Stack>
      </Container>
      {open && <AddTicket open={open} handleClose={toggleForm} />}
    </Page>
  );
};

export default Agent;
