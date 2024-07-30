"use client"
import { useState } from "react"


export default function ResetPinDialog({phonenumber, onReset}){ 

    

    return( 
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-95 flex items-center justify-center">
            <div className="bg-white rounded opacity-100 flex flex-col items-center justify-center p-8 gap-8">
                <h1 className="font-bold text-black">Reset Pin</h1>
                <div className="w-full flex flex-col gap-2">
                    <input className="rounded border-2 border-gray-500 p-2"
                        placeholder="New pin"/>
                </div>
                <div className="w-full flex items-center justify-end">
                    <button className="rounded px-2 py-1 bg-red-600 opacity-100 text-white"
                        onClick={onReset}>
                        Reset Pin
                    </button>
                </div>
            </div>
        </div>
    )
}