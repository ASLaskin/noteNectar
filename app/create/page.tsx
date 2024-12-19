"use client"
//TODO: GET RID OF "use client"
// ⨯ Error: Event handlers cannot be passed to Client Component props.
//   <... onUploadSuccess={function handleUploadSuccess}>
//   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
import UploadForm from "@/components/uploadForm";

const CreatePage = () => {


    const handleUploadSuccess = (data: { file: File; title: string }) => {

      };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-4">
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-xl">
                <div className="bg-indigo-600 dark:bg-indigo-800 text-white p-6 rounded-t-lg">
                    <h1 className="text-3xl font-semibold">Create New Document</h1>
                    <p className="mt-2 text-lg">Upload your PDF to create a new document summary.</p>
                </div>

                <div className="p-6">
                    <UploadForm onUploadSuccess={handleUploadSuccess} />
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
