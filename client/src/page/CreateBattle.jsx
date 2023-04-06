import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "../styles"
import { useGlobalContext } from "../context"

import { PageHOC, CustomButton, CustomInput, GameLoad } from "../components"

const CreateBattle = () => {
  const navigate = useNavigate()
  const { contract, battleName, setBattleName, gameData } = useGlobalContext()
  const [waitBattle, setWaitBattle] = useState(false)

  useEffect(() => {
    if (gameData?.activeBattle?.battleStatus === 1) {
      navigate(`/battle/${gameData.activeBattle.name}`)
    } else if (gameData?.activeBattle?.battleStatus === 0) {
      setWaitBattle(true)
    }
  }, [gameData])

  const handleClick = async () => {
    if (!battleName || !battleName.trim()) return null

    try {
      await contract.createBattle(battleName, {
        gasLimit: 200000
      })
      setWaitBattle(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      {waitBattle && <GameLoad />}
      <div className="flex flex-col mb-5">
        <CustomInput
          label="Battle"
          placeholder="Enter the battle name"
          value={battleName}
          handleValueChange={setBattleName}
        />

        <CustomButton
          title="Create Battle"
          handleClick={handleClick}
          restStyles="mt-6"
        />
        <p className={styles.infoText} onClick={() => navigate("/join-battle")}>
          Or join already existing battles
        </p>
      </div>
    </>
  )
}

export default PageHOC(
  CreateBattle,
  <>
    Create <br /> a new Battle
  </>,
  <>Create your own battle and wait for other players to join</>
)
