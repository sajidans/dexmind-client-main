import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { createOrUpdateBanner, deleteBanner, getAllBanners } from "../../api/admin-api";
import { Button2 } from "../../components/ui/Buttons";
import PageLoader from "../../components/ui/PageLoader";
import { SwalError, SwalSuccess } from "../../utils/custom-alert";

const NewsandNotifs = () => {
    const [loading, setLoading] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [payload, setPayload] = useState({
        title: "",
        banner: null,
    });
    const [banners, setBanners] = useState([]);
    const [modalImage, setModalImage] = useState(null); // 👈 modal image state

    useEffect(() => {
        fetchBanners();
    }, []);

    const fetchBanners = async () => {
        try {
            const res = await getAllBanners();
            setBanners(res.data);
        } catch (err) {
            console.error("Failed to load banners:", err);
        }
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("title", payload.title);
        formData.append("file", payload.banner);

        try {
            setLoading(true);
            await createOrUpdateBanner(formData);
            SwalSuccess.fire({
                title: "Success",
                text: "Banner created successfully.",
                confirmButtonText: "OK",
                timer: 2000,
            });
            setPayload({ title: "", banner: null });
            fetchBanners();
        } catch (err) {
            console.error("Error creating banner:", err);
            SwalError.fire({
                title: "Error",
                text: err?.response?.data?.message || "Error creating banner.",
                confirmButtonText: "OK",
            });
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        if (!payload.title.trim()) {
            SwalError.fire({
                title: "Error",
                text: "Title is required.",
                confirmButtonText: "OK",
                timer: 2000,
            });
            return false;
        }
        if (!payload.banner) {
            SwalError.fire({
                title: "Error",
                text: "Image is required.",
                confirmButtonText: "OK",
                timer: 2000,
            });
            return false;
        }
        return true;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPayload({ ...payload, banner: file });
        }
    };

    const serialNumberTemplate = (rowData, { rowIndex }) => {
        return rowIndex + 1;
    };

    const deleteActionHandler = (rowData) => {
        return (
            <button
                onClick={async () => {
                    await deleteBanner(rowData._id);
                    SwalSuccess.fire({
                        title: "Success",
                        text: "Banner deleted successfully.",
                        confirmButtonText: "OK",
                        timer: 2000,
                    }).then(() => {
                        fetchBanners();
                    });
                }}
                className="text-2xl flex gap-2 items-center justify-center px-3 py-2 bg-red-500 text-white font-medium mx-auto rounded-md"
            >
                Delete <MdDeleteForever />
            </button>
        );
    };

    const handleImageClick = (imgUrl) => {
        setModalImage(imgUrl);
    };

    return (
        <>
            {loading && <PageLoader />}
            <div className="d-flex flex-column justify-content-start align-items-start">
                <h1 className="text-[2rem]">Create a Banner</h1>
                <div className="d-flex flex-column flex-md-row justify-content-start gap-5 gap-md-5 align-items-stretch align-items-md-end w-100 mt-4">
                    <div className="form-group">
                        <label className="text-[1.5rem] font-bold">Title</label>
                        <input
                            type="text"
                            className="form-control p-4 text-[1.3rem]"
                            placeholder="Enter Title"
                            value={payload.title}
                            onChange={(e) => setPayload({ ...payload, title: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="text-[1.5rem] font-bold">Image</label>
                        <input
                            type="file"
                            className="form-control p-4 text-[1.3rem]"
                            onChange={handleFileChange}
                        />
                    </div>

                    <div className="mt-3">
                        <Button2
                            name="Create Banner"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>

                {/* Table Section */}
                <div className="w-100 mt-5">
                    <h2 className="text-[1.8rem] font-bold mb-3">Uploaded Banners</h2>
                    <DataTable
                        value={banners}
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        filterDisplay="row"
                        globalFilter={globalFilter}
                    >
                        <Column body={serialNumberTemplate} header="S.No" filter sortable />
                        <Column field="title" header="Title" filter sortable />
                        <Column field="imageUrl" header="Image" body={(rowData) => {
                            return (
                                <img
                                    src={rowData?.imageUrl}
                                    alt={rowData.title}
                                    onClick={() => handleImageClick(rowData.imageUrl)}
                                    style={{ objectFit: "cover", cursor: "pointer" }}
                                    className="w-52 h-full mx-auto hover:opacity-75 transition-all duration-200"
                                />
                            );
                        }} filter sortable />
                        <Column header="Delete" body={deleteActionHandler} filter sortable />
                    </DataTable>
                </div>
            </div>

            {/* 👇 Modal for Full Image View */}
            {modalImage && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90%] flex flex-col items-center gap-4">
                        <img
                            src={modalImage}
                            alt="Banner"
                            className="max-h-[70vh] max-w-full object-contain rounded"
                        />
                        <button
                            onClick={() => setModalImage(null)}
                            className="bg-red-500 text-white px-6 py-3 text-[1.6rem] rounded hover:bg-red-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewsandNotifs;
