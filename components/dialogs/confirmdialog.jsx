





export default function ConfirmDialog({title, message, onConfirm, onCancel}){ 
    return( 
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-95 flex items-center justify-center">
            <div className="bg-white rounded opacity-100 flex flex-col items-center justify-center p-8 gap-8">
                <h1 className="font-bold">{title}</h1>
                <div className="w-full">
                    <p className="text-center">{message}</p>
                </div>
                <div className="w-full flex items-center justify-between">
                    <button className="rounded p-2 bg-blue-900 opacity-100 text-white"
                        onClick={onConfirm}>
                           Confirm
                    </button>
                    <button className="rounded p-2 bg-red-600 opacity-100 text-white"
                        onClick={onCancel}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}