import { Store } from "../runtime";
import Button from "./Button";
import Col from "./Col";
import GridLayout from "./GridLayout";
import Iterator from "./Iterator";
import Root from "./Root";
import Row from "./Row";
import Slot from "./Slot";
import Text from "./Text";

export default {
  install(store: Store) {
    store.defineWidget(Root);
    store.defineWidget(Iterator);
    store.defineWidget(Text);
    store.defineWidget(Slot);
    store.defineWidget(GridLayout);
    store.defineWidget(Row);
    store.defineWidget(Col);
    store.defineWidget(Button);
  }
};
