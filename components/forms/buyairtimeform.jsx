"use client"
import { useState, useEffect } from "react"
import ConfirmDialog from "../dialogs/confirmdialog"
import AlertDialog from "../dialogs/alertdialog"


export default function BuyAirtimeForm(){

    const [airtimetype, setAirtimetype] = useState("voucher")
    const [currency, setCurrency] = useState("USD")
    const [amount, setAmount] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [voucher, setVoucher] = useState({})
    const [userid,setUserid] = useState()
    const [errorMsg, setErrormsg] = useState()
    const [showConfirmdialog, setShowconfirmdialog] = useState(false)
    const [dialogTitle, setDialogtitle] = useState()
    const [username, setUsername] = useState()
    const [dialogMsg, setDialogMsg] = useState()
    const [displayVoucher, setDisplayVoucher] = useState(false)
    const [showAlertdialog, setShowalertdialog] = useState(false)
    const [alertdialogTitle, setAlertdialogtitle] = useState()
    const [alertdialogMsg, setAlertdialogmsg] = useState()

    const buyAirtime = async() => {
        if(airtimetype === "voucher"){
            const res = await fetch("/api/airtimevouchers",{
                method:"PUT",
                headers:{"Content-type":"application/jsom"},
                body: JSON.stringify({
                    transaction: "airtime-voucher",
                    currency,
                    executedby:`${username}-${userid}`,
                    amount
                })
            })

            const data = await res.json()

            if(data.success){
                setVoucher(data.voucher)
                setAlertdialogtitle("Success")
                setAlertdialogmsg("Voucher bought successfully")
                setShowalertdialog(true)
            }else{
                setErrormsg(data.message)
                setAlertdialogtitle("Failed")
                setAlertdialogmsg(errorMsg)
                setShowalertdialog(true)
            }
        }else if(airtimetype === "pinless"){
            setDialogtitle(`buy ${currency}${amount} airtime for ${phonenumber}`)
            setShowconfirmdialog(true)
        }
    }

    useEffect(()=>{
        const _username = localStorage.getItem("username")
        const _userid = localStorage.getItem("userid")
        setUsername(_username)
        setUserid(_userid)
    })
    return(
        <div className="w-full h-full flex flex-col gap-8">
            <div className="w-full flex items-center justify-between bg-blue-900 px-4 py-1">
                <div className="flex items-center gap-2 text-white">
                    <h1 className="text-sm text-white font-semibold">Buy Airtime</h1>
                </div>
            </div>
            <div className="flex flex-col w-full h-full gap-8">
                <div className="flex gap-16">
                    <div className="flex gap-4">
                        <h1 className="text-sm font-semibold">Currency:</h1>
                        <div className="flex">
                            <button className={`${currency === "USD"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1 font-semibold`}
                                onClick={() => setCurrency("USD")}>
                                    USD
                            </button>
                            <button className={`${currency === "ZiG"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1  font-semibold`}
                                onClick={() => setCurrency("ZiG")}>
                                    ZiG
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex gap-4">
                        <h1 className="text-sm font-semibold">Airtime Type:</h1>
                        <div className="flex">
                            <button className={`${airtimetype === "voucher"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1 font-semibold`}
                                onClick={() => setAirtimetype("voucher")}
                                type="button">
                                    Voucher
                            </button>
                            <button className={`${airtimetype === "pinless"? "bg-blue-900 text-white" : "bg-gray-200 text-black"} px-2 py-1  font-semibold`}
                                onClick={() => setAirtimetype("pinless")}>
                                    Direct Airtime
                            </button>
                        </div>
                    </div>
                </div>
                <form onSubmit={(e) => {e.preventDefault(); buyAirtime()}} className="flex flex-col w-full gap-4">
                    <div className="flex flex-col w-full">
                        <div className="flex w-full gap-2">
                            <div className="flex flex-col">
                                <h1 className="text-xs font-semibold">Amount:</h1>
                                <input className="rounded border border-gray-400 w-96 px-2 py-1"
                                    placeholder="amount"
                                    onChange={(e) => setAmount(e.target.value)} 
                                    required/>
                            </div>
                            {airtimetype === "pinless" && 
                                <div className="flex flex-col">
                                    <h1 className="text-xs font-semibold">Phone:</h1>
                                    <input className="rounded border border-gray-400 w-96 px-2 py-1"
                                        placeholder="phone"
                                        onChange={(e) => setPhonenumber(e.target.value)} 
                                        required/>
                                </div>}
                        </div>
                    </div>
                    <div className="flex">
                        <button className="bg-blue-900 font-semibold text-white w-96 rounded p-1"
                            type="Submit">
                            BUY AIRTIME
                        </button>
                    </div>
                </form>
                {displayVoucher && <div>
                    <h1 className="text-sm">Voucher</h1>
                    <h1 className="text-sm font-semibold">Recharge Pin: {voucher.rechargepin}</h1>
                    <span className="flex gap-4">
                        <h1 className="text-xs">Serial No: {voucher.serialno}</h1>
                        <h1 className="text-xs">Batch No: {voucher.batchno}</h1>
                    </span>
                </div>}
            </div>

            {showConfirmdialog && <ConfirmDialog 
                title={dialogTitle}
                message={dialogMsg}
                onConfirm={()=>{}}
                onCancel={()=>{setShowconfirmdialog(false)}
                }/>}
            {showAlertdialog && 
                <AlertDialog 
                    title={alertdialogTitle}
                    message={alertdialogMsg}
                    onOk={()=>{setDisplayVoucher(true); setShowalertdialog(false)}}/>}
        </div>
    )
}