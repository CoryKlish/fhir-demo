import React from 'react';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

const InfoPopover = ({ data }) => {
  return (
    <>
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
        <Button variant="secondary">When to Use</Button>
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
        <Button variant="secondary">Pearls/Pitfalls</Button>
      </OverlayTrigger>
    </>
  );
};

export default InfoPopover;
