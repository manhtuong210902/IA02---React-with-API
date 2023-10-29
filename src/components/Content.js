import { Container, Form, Row, Spinner } from "react-bootstrap";
import { useCallback, useRef, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import PhotoItem from "./PhotoItem";
import useSearchPhoto from "../hooks/useSearchPhoto";

function Content() {
    const [query, setQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const debounceQuery = useDebounce(query, 500);
    const { loading, photos, hasMore } = useSearchPhoto(debounceQuery, currentPage);

    const observer = useRef();
    const lastElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setCurrentPage((prevPageNumber) => prevPageNumber + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Container className="py-2">
            <Row>
                <Form className="d-flex mt-2 search-input mb-3" onSubmit={handleSubmit}>
                    <Form.Control
                        type="search"
                        placeholder="Tìm kiếm ảnh"
                        className="me-2"
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </Form>
                <h4>Danh sách ảnh</h4>
            </Row>
            <Row>
                {photos.length > 0 &&
                    photos.map((photo, index) => {
                        if (photos.length === index + 1) {
                            return <PhotoItem ref={lastElementRef} key={index} data={photo} />;
                        } else {
                            return <PhotoItem key={index} data={photo} />;
                        }
                    })}
                {loading && (
                    <div className="d-flex align-items-center gap-2 mb-4 mt-3 text-success">
                        <Spinner animation="border" size="sm" />
                        <span>Đang tải ảnh...</span>
                    </div>
                )}
            </Row>
        </Container>
    );
}

export default Content;
