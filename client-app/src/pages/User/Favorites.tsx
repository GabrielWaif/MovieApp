import { useContext } from "react";
import { getUserFavorites } from "../../functions/requests/MovieRequests";
import AccountCheck from "../../components/account/AccountCheck";
import { UserContext } from "../../contexts/UserContext";
import ErrorContainer from "../../components/UI/ErrorContainer";
import Container from "../../components/UI/Container";
import GenericMovielist from "../../components/UI/GenericMovieList";

const Details = () => {
  //Contexts
  const context = useContext(UserContext);

  const error = context.isLogedIn ? null : "Not Logged In";

  return (
    <Container>
      <ErrorContainer error={error}>
        <>
          <AccountCheck />
          <h1 className="title">{`Your Favorites`}</h1>
          <GenericMovielist
            fetchFunction={getUserFavorites}
            filterId={String(context.userInfo?.token)}
          />
        </>
      </ErrorContainer>
    </Container>
  );
};
export default Details;
