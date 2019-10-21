import { combineEpics } from "redux-observable";
import { epics as postEpics } from "./reducers/postDuck";

const rootEpic = combineEpics(...postEpics);

export default rootEpic;
