import {
  EAS,
  Offchain,
  SchemaEncoder,
  SchemaRegistry
} from '@ethereum-attestation-service/eas-sdk'
import { Address } from 'viem'

export const EASContractAddress = '0xC2679fBD37d54388Ce493F1DB75320D236e1815e'
const eas = new EAS(EASContractAddress)

async function CreateUserAttestations (
  impactName: string,
  impactValue: number,
  recipient: Address
) {
  const schemaEncoder = new SchemaEncoder('uint256 eventId, uint8 voteIndex')
  const encodedData = schemaEncoder.encodeData([
    { name: 'impactName', value: impactName, type: 'string' },
    { name: 'impactValue', value: impactValue, type: 'uint256' }
  ])
  const schemaUID =
    '0xb16fa048b0d597f5a821747eba64efa4762ee5143e9a80600d0005386edfc995'
  const tx = await eas.attest({
    schema: schemaUID,
    data: {
      recipient: recipient,
      //@ts-expect-error - ethers.js types are not up to date
      expirationTime: 0,
      revocable: true,
      data: encodedData
    }
  })
  return await tx.wait()
}

