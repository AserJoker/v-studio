import React, { useEffect, useState } from "react";
import "./index.less";
import Horizontal from "../Horizontal";
import { Application, IAction, IExplorer } from "@/studio";
import Vertical from "../Vertical";
import { classname } from "@/util";
import { Divider } from "../Divider";
const Explorer: React.FC = () => {
  const theApp = Application.theApp;
  const [current, setCurrent] = useState<string | undefined>(undefined);
  const [explorers, setExplorers] = useState(theApp.getExplorers());
  const [explorerWidth, setExplorerWidth] = useState(20 * 16 + 48);
  useEffect(() => {
    return theApp.$bus.on(Application.EVENT_EXPLORER_CHANGE, () => {
      setExplorers(theApp.getExplorers());
    });
  }, []);
  useEffect(() => {
    return theApp.$bus.on(
      Application.EVENT_EXPLORER_ACTION_CLICK,
      ({ action }: { action: string }) => {
        if (action === "close") {
          setCurrent(undefined);
        }
      }
    );
  }, []);
  const onClickItem = (item: IExplorer) => {
    if (current === item.name) {
      setCurrent(undefined);
    } else {
      setCurrent(item.name);
    }
  };
  const explorer: IExplorer | undefined = current
    ? theApp.getExplorer(current)
    : undefined;
  const actions: IAction[] = [];
  const popupActions: IAction[] = [];
  if (explorer && explorer.actions) {
    actions.push(...explorer.actions.slice(0, 4));
    popupActions.push(
      ...explorer.actions.slice(4, explorer.actions.length - 1)
    );
  }
  actions.push({
    name: "close",
    icon: () => "x",
  });
  return (
    <div className="explorer">
      <Horizontal fill>
        <Vertical layout="start" className="explorer-icon-list">
          {explorers.map((name) => {
            const explorer = theApp.getExplorer(name);
            return (
              <div
                className={classname("explorer-icon", {
                  active: current === name,
                })}
                onClick={() => onClickItem(explorer)}
                key={name}
              >
                {explorer.icon()}
              </div>
            );
          })}
        </Vertical>
        {current && (
          <Vertical
            className="explorer-content"
            style={{ width: `${explorerWidth - 48}px` }}
          >
            <div className="explorer-content-title">
              <div>{current}</div>
              <div className="explorer-action-bar">
                {actions.map((act) => {
                  return (
                    <div
                      className="explorer-action"
                      key={act.name}
                      onClick={() =>
                        theApp.$bus.emit(
                          Application.EVENT_EXPLORER_ACTION_CLICK,
                          {
                            explorer: current,
                            action: act.name,
                          }
                        )
                      }
                    >
                      {act.icon()}
                    </div>
                  );
                })}
              </div>
            </div>
            {explorer?.content()}
          </Vertical>
        )}
        {current && (
          <Divider
            offset={explorerWidth}
            direction="row"
            onChange={(val) => {
              if (val < 20 * 16 + 48) {
                return;
              }
              setExplorerWidth(val);
            }}
          />
        )}
      </Horizontal>
    </div>
  );
};
export default Explorer;
