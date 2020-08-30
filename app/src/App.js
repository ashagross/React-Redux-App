import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import './App.css';


const App = (props) => {
  return (
    <Container maxWidth="sm">
      <h1>
        Dad Jokes:
      </h1>

      {props.isLoading ? (
        <p>Loading...</p>
      ) : (
          <p>
            {props.dadJoke}
          </p>
        )}

      <Button variant="contained" color="default" disableElevation
        onClick={() => {
          props.fetchDadJokeFromApi();
        }}
      >
        NEW HAHA
      </Button>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    dadJoke: state.dadJoke,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // Dispatch a regular action
    // changeDadJoke: (newDadJoke) => {
    //   dispatch({
    //     type: "CHANGE_DAD_JOKE",
    //     payload: newDadJoke,
    //   });
    // },

    fetchDadJokeFromApi: () => {
      // Dispatch a FUNCTION
      dispatch(() => {
        dispatch({
          type: "FETCH_DAD_JOKE_PENDING"
        });
        axios({
          method: "GET",
          url: "https://icanhazdadjoke.com",
          headers: {
            Accept: "application/json"
          }
        })
          // axios.get("https://icanhazdadjoke.com")
          .then((response) => {
            dispatch({
              type: "FETCH_DAD_JOKE_SUCCESS",
              payload: response.data.joke
            });
          })
          .catch(() => {
            dispatch({
              type: "FETCH_DAD_JOKE_ERROR",
              payload: "Sth wrong happened. Please contact support!"
            });
          });
      });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
