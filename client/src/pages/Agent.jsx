/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Stack } from "@mui/material";
import Page from "../components/Page";
import { MagnifyingGlass, Plus } from "@phosphor-icons/react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../components/search";
import { AddAgent, AgentTable } from "../section/agent";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAgents } from "../redux/slices/agent";
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
      dispatch(getAgents(text));
    };
    const debouncedDispatch = debounce(dispatchAction, 500);

    debouncedDispatch();

    return () => debouncedDispatch.cancel(); // Clean up the debounced function on component unmount
  }, [text]);

  return (
    <Page title="Agents">
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
              Add Agent
            </Button>
          </Stack>
          <AgentTable />
        </Stack>
      </Container>
      {open && <AddAgent open={open} handleClose={toggleForm} />}
    </Page>
  );
};

export default Agent;
