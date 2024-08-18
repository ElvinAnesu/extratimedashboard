

export default function Header({title}){ 

    
    return( 
        <div className="flex items-center p-2 h-9 bg-blue-900 text-white rounded shadow w-full">
            <h1 className="font-semibold">{title}</h1>
        </div>
    )
}