"use client";

import { useEffect, useState } from "react";
import { useRef } from "react";

export default function ScheduleAdd() {
  const nameRef = useRef<HTMLInputElement>(null);
  const [shinsei, setShinsei] = useState("");
  const [reason, setReason] = useState("");
  const [parts, setParts] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedPart, setSelectedPart] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState("");
  const [errors, setErrors] = useState({
    shinsei: "",
    parts: "",
    teams: "",
    schedule:"",
    reason:"",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("https://swcbbl.com/nxphp/getPart.php")
      .then(res => res.json())
      .then(data => setParts(data));
  }, []);

  useEffect(() => {
    fetch("https://swcbbl.com/nxphp/getSchedule.php")
      .then(res => res.json())
      .then(data => setSchedules(data));
  }, []);

  const handlePartChange = (e: any) => {
    const partno = e.target.value;
    setSelectedPart(partno);

    if (!partno) {
      setTeams([]);
      return;
    }

    fetch(`https://swcbbl.com/nxphp/getTeamByPartno.php?partno=${partno}`)
      .then(res => res.json())
      .then(data => setTeams(data));
  };

  const handleSubmit = async () => {
    const newErrors: any = {};

    if (!shinsei) newErrors.shinsei = "申請者を入力してください";
    if (!selectedPart) newErrors.parts = "部を選択してください";
    if (!selectedTeam) newErrors.teams = "チームを選択してください";
    if (!selectedSchedule) newErrors.schedule = "申請日を選択してください";
    if (!reason) newErrors.reason = "理由を入力してください";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    if (!confirm("申請してよろしいですか？")) return;
    setMessage("");

    /* try {
      const res = await fetch("https://swcbbl.com/nxphp/insertMember.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          shinsei,
          member_name,
          partno: selectedPart,
          teamno: selectedTeam,
          birthday,
          hosoku
        })
      }); 

      const result = await res.json();

      if (result.status === "ok") {
        setMessage("登録しました！");

        // フォーカス戻す
        nameRef.current?.focus();
        // スクロール
        window.scrollTo({ top: 0, behavior: "smooth" });

        setShinsei(shinsei);
        setMemberName("");
        setSelectedPart("");
        setSelectedTeam("");
        setBirthday("");
        setHosoku("");
        setTeams([]);
      }
      else {
        alert("エラー：" + result.message);
        setMessage(result.message);
        // フォーカス戻す
        nameRef.current?.focus();
        // スクロール
        window.scrollTo({ top: 0, behavior: "smooth" });
      }

    } catch (err) {
      console.error(err);
      alert("通信エラー");
    }*/
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-5">

        <h1 className="text-xl font-bold text-center">日程調整依頼</h1>
        <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-lg text-sm space-y-1">
          <p>下記項目を入力してください。</p>
          <p>※依頼回数は各チーム３回までです。</p>
        </div>
        {message && (
          <div className="bg-green-100 text-green-700 p-2 rounded text-center">
            {message}
          </div>
        )}
        {/* 申請者 */}
        <div>
          <label className="text-sm text-gray-600">申請者</label>
          <input
            ref={nameRef}
            name="shinsei"
            value={shinsei}
            onChange={(e) => {
              setShinsei(e.target.value);
              setErrors({ ...errors, shinsei: "" });
            }}
            className={`w-full p-2 border rounded ${
              errors.shinsei ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.shinsei && (
            <p className="text-red-500 text-sm mt-1">{errors.shinsei}</p>
          )}
        </div>

        {/* 部 */}
        <div>
          <label className="text-sm text-gray-600">部</label>
          <select
            name="partno"
            value={selectedPart}
            onChange={(e) => {
              handlePartChange(e);
              setErrors({ ...errors, parts: "" });
            }}
            className={`w-full p-3 border rounded-lg ${
              errors.parts ? "border-red-500" : ""
            }`}
          >
            <option value="">選択してください</option>
            {parts.map((part: any) => (
              <option key={part.partno} value={part.partno}>
                {part.name}
              </option>
            ))}
          </select>
          {errors.parts && (
            <p className="text-red-500 text-sm mt-1">{errors.parts}</p>
          )}
        </div>

        {/* チーム */}
        <div>
          <label className="text-sm text-gray-600">チーム</label>
          <select
            name="teamno"
            value={selectedTeam}
            onChange={(e) => {
              setSelectedTeam(e.target.value);
              setErrors({ ...errors, teams: "" });
            }}
            className={`w-full p-3 border rounded-lg ${
              errors.teams ? "border-red-500" : ""
            }`}
          >
            <option value="">
              {selectedPart ? "選択してください" : "先に部を選んでください"}
            </option>

          {teams.map((t: any, index) => (
            <option key={index} value={t.teamno}>
              {t.name}
            </option>
          ))}
          </select>
          {errors.teams && (
            <p className="text-red-500 text-sm mt-1">{errors.teams}</p>
          )}
        </div>

        {/* 申請日 */}
        <div>
          <label className="text-sm text-gray-600">申請日</label>
          <select
            name="schedule"
            value={selectedSchedule}
            onChange={(e) => {
              setSelectedSchedule(e.target.value);
              setErrors({ ...errors, schedule: "" });
            }}
            className={`w-full p-3 border rounded-lg ${
              errors.schedule ? "border-red-500" : ""
            }`}
          >
            <option value="">選択してください</option>
            {schedules.map((schedule: any) => (
              <option key={schedule.id} value={schedule.id}>
                {schedule.date}
              </option>
            ))}
          </select>
          {errors.schedule && (
            <p className="text-red-500 text-sm mt-1">{errors.schedule}</p>
          )}
        </div>

        {/* 理由 */}
        <div>
          <label className="text-sm text-gray-600">理由</label>
          <input
            name="reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setErrors({ ...errors, reason: "" });
            }}
            className={`w-full p-2 border rounded ${
              errors.reason ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.reason && (
            <p className="text-red-500 text-sm mt-1">{errors.reason}</p>
          )}
        </div>

        {/* ボタン */}
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600"
        >
          申請する
        </button>

      </div>
    </div>
  );
}