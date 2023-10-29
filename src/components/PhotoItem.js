import React from "react";
import { Card, Col } from "react-bootstrap";

const PhotoItem = React.forwardRef(({ data }, ref) => {
    return (
        <Col sm={6} md={4} lg={3} className="my-3">
            <div ref={ref}>
                <Card>
                    <Card.Img variant="top" src={data?.src.small} alt={data?.photographer} height={300} />
                </Card>
            </div>
        </Col>
    );
});

export default PhotoItem;
