import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie, getCast, getTags } from "../../functions/MovieRequests";
import {
  AllMovieInfoType,
  CastEntryType,
  CastType,
  TagEntriesType,
} from "../../Type/Types";
import ItemInput from "../../components/UI/inputs/ItemInput";
import SubmitButton from "../../components/UI/SubmitButton";
import { UserContext } from "../../Context/UserContext";
import { NotificationContext } from "../../Context/NotificationContext";

const AddMovieForm = () => {
  //States
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [dataTags, setDataTags] = useState<TagEntriesType[]>([]);
  const [tags, setTags] = useState<TagEntriesType[]>([]);
  const [dataCast, setDataCast] = useState<CastType[]>([]);
  const [cast, setCast] = useState<CastEntryType[]>([]);

  //Contexts
  const context = useContext(UserContext);
  const notification = useContext(NotificationContext);

  //Hooks
  const navigate = useNavigate();

  //Input Handler
  const nameChangeHandler = (event: any) => {
    setName(event.target.value);
  };
  const urlChangeHandler = (event: any) => {
    setUrl(event.target.value);
  };
  const roleChangeHandler = (event: any) => {
    setRole(event.target.value);
  };
  const tagsChangeHandler = (
    inputTags: TagEntriesType[],
    inputDataTags: TagEntriesType[]
  ) => {
    setDataTags([...inputDataTags]);
    setTags([...inputTags]);
  };
  const castChangeHandler = (
    inputCast: CastEntryType[],
    inputDataCast: CastType[]
  ) => {
    setDataCast([...inputDataCast]);
    setCast([...inputCast]);
    setRole("");
  };

  //Delete Handler
  const dateChangeHandler = (event: any) => {
    setDate(event.target.value);
  };

  //Submit Handler
  const submitHandler = async (event: any) => {
    event.preventDefault();
    const newMovie: AllMovieInfoType = {
      movie: {
        name: name,
        coverUrl: url,
        releaseDate: date,
      },
      favorites: 0,
      tags: tags,
      castMembers: cast,
    };

    setLoading(true);
    try {
      await addMovie(newMovie, String(context.userInfo?.token));
      setError(null);
      notification.addNotification({
        code: "ADDED",
        text: "Movies was successfully added.",
        error: false,
      });
      navigate("/");
    } catch (ex: any) {
      setLoading(false);
      setError(ex.message);
    } finally {
    }
  };

  //Effect
  useEffect(() => {
    (async () => {
      try {
        const CastResponse = await getCast();
        const tagsResponse = await getTags();
        setDataTags([...tagsResponse]);
        setDataCast([...CastResponse]);
      } catch (ex: any) {
        setError(ex.message);
      }
    })();
  }, []);

  return (
    <form onSubmit={submitHandler}>
      <h1 className="title">Add new Movie</h1>

      {error !== null && <p className="error centered-message">{error}</p>}

      <div className="form-pair">
        <label>NAME</label>
        <input
          onChange={nameChangeHandler}
          className="input-dark input-add"
          type={"text"}
        />
      </div>

      <div className="form-pair">
        <label>COVER URL</label>
        <input
          onChange={urlChangeHandler}
          className="input-dark input-add"
          type={"text"}
        />
      </div>

      <div className="form-pair">
        <label>RELEASE DATE</label>
        <input
          onChange={dateChangeHandler}
          className="input-dark input-add"
          type={"date"}
        />
      </div>

      <div className="form-pair">
        <label>TAGS</label>
        <ItemInput
          onChange={tagsChangeHandler}
          dataItems={dataTags}
          items={tags}
          placeHolder={"Choose a person"}
          itemId={"tagId"}
          dataItemId={"tagId"}
        />
      </div>

      <div className="form-pair">
        <label>CAST</label>
        <ItemInput
          onChange={castChangeHandler}
          dataItems={dataCast}
          items={cast}
          role={role}
          placeHolder={"Choose a person"}
          itemId={"id"}
          dataItemId={"id"}
        >
          <input
            type={"text"}
            onChange={roleChangeHandler}
            placeholder={"role"}
            value={role}
          ></input>
        </ItemInput>
      </div>

      <SubmitButton loading={loading} buttonText={"Add"}></SubmitButton>
    </form>
  );
};

export default AddMovieForm;