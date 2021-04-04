import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

const InfoPopover = ({ data }) => {
  return (
    <div style={{ margin: 30 }}>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover-positioned-bottom">
            <Popover.Content>
              {data.whenToUse.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant="secondary" style={{ margin: 10 }}>
          When to Use
        </Button>
      </OverlayTrigger>
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={
          <Popover id="popover-positioned-bottom">
            <Popover.Content>
              <strong>{data.pearlsPitfaills.title}</strong>
              <p>{data.pearlsPitfaills.text}</p>
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant="secondary" style={{ margin: 10 }}>
          Pearls/Pitfalls
        </Button>
      </OverlayTrigger>
    </div>
  );
};

export default InfoPopover;
