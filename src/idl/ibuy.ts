/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/ibuy.json`.
 */
export type Ibuy = {
  address: 'iBuyaWpsVxSmZnRMPFR9BE83Cm2w2BUbKhmYcL3LCg3'
  metadata: {
    name: 'ibuy'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'adminSetCreator'
      discriminator: [69, 25, 171, 142, 57, 239, 13, 4]
      accounts: [
        {
          name: 'adminSetCreatorAuthority'
          writable: true
          signer: true
        },
        {
          name: 'global'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'mint'
        },
        {
          name: 'bondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118, 101]
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
          }
        },
        {
          name: 'eventAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'program'
        },
      ]
      args: [
        {
          name: 'creator'
          type: 'pubkey'
        },
      ]
    },
    {
      name: 'buy'
      discriminator: [102, 6, 61, 18, 1, 218, 235, 234]
      accounts: [
        {
          name: 'global'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'feeRecipient'
          writable: true
        },
        {
          name: 'creatorVault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'bonding_curve.creator'
                account: 'bondingCurve'
              },
            ]
          }
        },
        {
          name: 'mint'
        },
        {
          name: 'bondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118, 101]
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
          }
        },
        {
          name: 'associatedBondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'bondingCurve'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'associatedUser'
          writable: true
        },
        {
          name: 'user'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'eventAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'program'
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
        {
          name: 'maxSolCost'
          type: 'u64'
        },
      ]
    },
    {
      name: 'claimFee'
      discriminator: [169, 32, 79, 137, 136, 232, 70, 137]
      accounts: [
        {
          name: 'creator'
          writable: true
          signer: true
        },
        {
          name: 'creatorVault'
          docs: ['Use UncheckedAccount or SystemAccount; `owner = system_program::ID` enforces system ownership.']
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'creator'
              },
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'eventAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'program'
        },
      ]
      args: []
    },
    {
      name: 'claimFeeCpmm'
      discriminator: [16, 152, 51, 11, 104, 220, 116, 84]
      accounts: [
        {
          name: 'authority'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'nftAuthority'
          writable: true
          signer: true
        },
        {
          name: 'creator'
        },
        {
          name: 'creatorVault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'creator'
              },
            ]
          }
        },
        {
          name: 'lockProgram'
          address: 'LockrWmn6K5twhz3y9w1dQERbmgSaRkfnTeTKbpofwE'
        },
        {
          name: 'lockAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  108,
                  111,
                  99,
                  107,
                  95,
                  99,
                  112,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121,
                  95,
                  115,
                  101,
                  101,
                  100,
                ]
              },
            ]
            program: {
              kind: 'account'
              path: 'lockProgram'
            }
          }
        },
        {
          name: 'feeNftAccount'
          writable: true
        },
        {
          name: 'lockedLiquidity'
          writable: true
        },
        {
          name: 'cpSwapProgram'
          address: 'CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C'
        },
        {
          name: 'authorityCpmm'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  110,
                  100,
                  95,
                  108,
                  112,
                  95,
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  95,
                  115,
                  101,
                  101,
                  100,
                ]
              },
            ]
            program: {
              kind: 'account'
              path: 'cpSwapProgram'
            }
          }
        },
        {
          name: 'poolState'
          writable: true
        },
        {
          name: 'lpMint'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [112, 111, 111, 108, 95, 108, 112, 95, 109, 105, 110, 116]
              },
              {
                kind: 'account'
                path: 'poolState'
              },
            ]
            program: {
              kind: 'account'
              path: 'cpSwapProgram'
            }
          }
        },
        {
          name: 'recipientToken0Account'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'nftAuthority'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'baseMint'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'recipientToken1Account'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'nftAuthority'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'tokenMint'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'token0Vault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'poolState'
              },
              {
                kind: 'account'
                path: 'baseMint'
              },
            ]
            program: {
              kind: 'account'
              path: 'cpSwapProgram'
            }
          }
        },
        {
          name: 'token1Vault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [112, 111, 111, 108, 95, 118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'poolState'
              },
              {
                kind: 'account'
                path: 'tokenMint'
              },
            ]
            program: {
              kind: 'account'
              path: 'cpSwapProgram'
            }
          }
        },
        {
          name: 'baseMint'
        },
        {
          name: 'tokenMint'
          writable: true
        },
        {
          name: 'lockedLpVault'
          writable: true
        },
        {
          name: 'mplTokenMetadata'
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        },
        {
          name: 'metadata'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 116, 97, 100, 97, 116, 97]
              },
              {
                kind: 'account'
                path: 'mplTokenMetadata'
              },
              {
                kind: 'account'
                path: 'tokenMint'
              },
            ]
            program: {
              kind: 'account'
              path: 'mplTokenMetadata'
            }
          }
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'tokenProgram2022'
          address: 'TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb'
        },
        {
          name: 'memoProgram'
          address: 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
      ]
      args: []
    },
    {
      name: 'create'
      discriminator: [24, 30, 200, 40, 5, 28, 7, 119]
      accounts: [
        {
          name: 'mint'
          writable: true
          signer: true
        },
        {
          name: 'mintAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 105, 110, 116, 45, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'bondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118, 101]
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
          }
        },
        {
          name: 'associatedBondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'bondingCurve'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'global'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'mplTokenMetadata'
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        },
        {
          name: 'metadata'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 116, 97, 100, 97, 116, 97]
              },
              {
                kind: 'account'
                path: 'mplTokenMetadata'
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
            program: {
              kind: 'account'
              path: 'mplTokenMetadata'
            }
          }
        },
        {
          name: 'user'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'rent'
          address: 'SysvarRent111111111111111111111111111111111'
        },
        {
          name: 'eventAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'program'
        },
      ]
      args: [
        {
          name: 'name'
          type: 'string'
        },
        {
          name: 'symbol'
          type: 'string'
        },
        {
          name: 'uri'
          type: 'string'
        },
        {
          name: 'creator'
          type: 'pubkey'
        },
      ]
    },
    {
      name: 'initialize'
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237]
      accounts: [
        {
          name: 'admin'
          writable: true
          signer: true
        },
        {
          name: 'global'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: []
    },
    {
      name: 'lockLp'
      discriminator: [236, 140, 2, 95, 1, 131, 251, 254]
      accounts: [
        {
          name: 'global'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'lockAuthority'
        },
        {
          name: 'authority'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'withdrawAuthority'
          writable: true
          signer: true
        },
        {
          name: 'feeNftMint'
          writable: true
          signer: true
        },
        {
          name: 'nftAuthority'
          writable: true
        },
        {
          name: 'feeNftAccount'
          writable: true
        },
        {
          name: 'poolState'
          writable: true
        },
        {
          name: 'lockedLiquidity'
          writable: true
        },
        {
          name: 'lpMint'
          docs: ['The mint of liquidity token', 'address = pool_state.lp_mint']
          writable: true
        },
        {
          name: 'creatorLpToken'
          docs: ['creator lp token account']
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'authority'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'lpMint'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'lockedLpVault'
          writable: true
        },
        {
          name: 'token0Vault'
          docs: ['The address that holds pool tokens for token_0', 'address = pool_state.token_0_vault']
          writable: true
        },
        {
          name: 'token1Vault'
          docs: ['The address that holds pool tokens for token_1', 'address = pool_state.token_1_vault']
          writable: true
        },
        {
          name: 'metadataAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [109, 101, 116, 97, 100, 97, 116, 97]
              },
              {
                kind: 'account'
                path: 'metadataProgram'
              },
              {
                kind: 'account'
                path: 'feeNftMint'
              },
            ]
            program: {
              kind: 'account'
              path: 'metadataProgram'
            }
          }
        },
        {
          name: 'rent'
          docs: ['Sysvar for program account']
          address: 'SysvarRent111111111111111111111111111111111'
        },
        {
          name: 'systemProgram'
          docs: ['To create a new program account']
          address: '11111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          docs: ['Program to create mint account and mint tokens']
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associatedTokenProgram'
          docs: ['Program to create an ATA for receiving position NFT']
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'metadataProgram'
          address: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s'
        },
        {
          name: 'lockProgram'
          address: 'LockrWmn6K5twhz3y9w1dQERbmgSaRkfnTeTKbpofwE'
        },
      ]
      args: []
    },
    {
      name: 'migrateRaydium'
      discriminator: [198, 96, 158, 2, 114, 87, 180, 1]
      accounts: [
        {
          name: 'global'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'authority'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'withdrawAuthority'
          writable: true
          signer: true
        },
        {
          name: 'token0Mint'
          docs: ['Token_0 mint, the key must smaller then token_1 mint.']
        },
        {
          name: 'token1Mint'
          docs: ['Token_1 mint, the key must grater then token_0 mint.']
        },
        {
          name: 'creator0Ata'
          writable: true
        },
        {
          name: 'creator1Ata'
          writable: true
        },
        {
          name: 'ammConfig'
        },
        {
          name: 'authorityCpmm'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  97,
                  110,
                  100,
                  95,
                  108,
                  112,
                  95,
                  109,
                  105,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  95,
                  115,
                  101,
                  101,
                  100,
                ]
              },
            ]
            program: {
              kind: 'account'
              path: 'cpSwapProgram'
            }
          }
        },
        {
          name: 'poolState'
          writable: true
        },
        {
          name: 'lpMint'
          writable: true
        },
        {
          name: 'creatorLpToken'
          writable: true
        },
        {
          name: 'token0Vault'
          writable: true
        },
        {
          name: 'token1Vault'
          writable: true
        },
        {
          name: 'createPoolFee'
          docs: ['create pool fee account']
          writable: true
          address: 'DNXgeM9EiiaAbaWvwjHj9fQQLAX5ZsfHyvmYUNRAdNC8'
        },
        {
          name: 'observationState'
          docs: ['an account to store oracle observations']
          writable: true
        },
        {
          name: 'cpSwapProgram'
          address: 'CPMMoo8L3F4NbTegBCKVNunggL7H1ZpdTHKxQB5qKP1C'
        },
        {
          name: 'tokenProgram'
          docs: ['Program to create mint account and mint tokens']
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'token0Program'
          docs: ['Spl token program or token program 2022']
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'token1Program'
          docs: ['Spl token program or token program 2022']
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associatedTokenProgram'
          docs: ['Program to create an ATA for receiving position NFT']
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          docs: ['To create a new program account']
          address: '11111111111111111111111111111111'
        },
        {
          name: 'rent'
          docs: ['Sysvar for program account']
          address: 'SysvarRent111111111111111111111111111111111'
        },
        {
          name: 'eventAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'program'
        },
      ]
      args: []
    },
    {
      name: 'prepareMigrate'
      discriminator: [42, 220, 15, 49, 228, 87, 227, 93]
      accounts: [
        {
          name: 'global'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'authority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'withdrawAuthority'
          writable: true
          signer: true
        },
        {
          name: 'token0Mint'
        },
        {
          name: 'token1Mint'
        },
        {
          name: 'bondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118, 101]
              },
              {
                kind: 'account'
                path: 'token1Mint'
              },
            ]
          }
        },
        {
          name: 'curveTokenAccount'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'bondingCurve'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'token1Mint'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'creator0Ata'
          writable: true
        },
        {
          name: 'creator1Ata'
          writable: true
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'associatedTokenProgram'
          address: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: []
    },
    {
      name: 'sell'
      discriminator: [51, 230, 133, 164, 1, 127, 131, 173]
      accounts: [
        {
          name: 'global'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'feeRecipient'
          writable: true
        },
        {
          name: 'creatorVault'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [99, 114, 101, 97, 116, 111, 114, 45, 118, 97, 117, 108, 116]
              },
              {
                kind: 'account'
                path: 'bonding_curve.creator'
                account: 'bondingCurve'
              },
            ]
          }
        },
        {
          name: 'mint'
        },
        {
          name: 'bondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [98, 111, 110, 100, 105, 110, 103, 45, 99, 117, 114, 118, 101]
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
          }
        },
        {
          name: 'associatedBondingCurve'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'account'
                path: 'bondingCurve'
              },
              {
                kind: 'const'
                value: [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169,
                ]
              },
              {
                kind: 'account'
                path: 'mint'
              },
            ]
            program: {
              kind: 'const'
              value: [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89,
              ]
            }
          }
        },
        {
          name: 'associatedUser'
          writable: true
        },
        {
          name: 'user'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
        {
          name: 'tokenProgram'
          address: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
        },
        {
          name: 'eventAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'program'
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
        },
        {
          name: 'minSolOutput'
          type: 'u64'
        },
      ]
    },
    {
      name: 'setParams'
      discriminator: [27, 234, 178, 52, 147, 2, 187, 141]
      accounts: [
        {
          name: 'global'
          writable: true
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [103, 108, 111, 98, 97, 108]
              },
            ]
          }
        },
        {
          name: 'authority'
          writable: true
          signer: true
        },
        {
          name: 'eventAuthority'
          pda: {
            seeds: [
              {
                kind: 'const'
                value: [95, 95, 101, 118, 101, 110, 116, 95, 97, 117, 116, 104, 111, 114, 105, 116, 121]
              },
            ]
          }
        },
        {
          name: 'program'
        },
      ]
      args: [
        {
          name: 'feeRecipients'
          type: {
            array: ['pubkey', 8]
          }
        },
        {
          name: 'initialVirtualTokenReserves'
          type: 'u64'
        },
        {
          name: 'initialVirtualSolReserves'
          type: 'u64'
        },
        {
          name: 'initialRealTokenReserves'
          type: 'u64'
        },
        {
          name: 'tokenTotalSupply'
          type: 'u64'
        },
        {
          name: 'feeBasisPoints'
          type: 'u64'
        },
        {
          name: 'withdrawAuthority'
          type: 'pubkey'
        },
        {
          name: 'nftAuthority'
          type: 'pubkey'
        },
        {
          name: 'enableMigrate'
          type: 'bool'
        },
        {
          name: 'poolMigrationFee'
          type: 'u64'
        },
        {
          name: 'creatorFeeBasisPoints'
          type: 'u64'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'bondingCurve'
      discriminator: [23, 183, 248, 55, 96, 216, 172, 96]
    },
    {
      name: 'global'
      discriminator: [167, 232, 232, 177, 200, 108, 114, 127]
    },
  ]
  events: [
    {
      name: 'claimCreatorFeeEvent'
      discriminator: [151, 172, 14, 31, 51, 38, 77, 175]
    },
    {
      name: 'completeEvent'
      discriminator: [95, 114, 97, 156, 212, 46, 152, 8]
    },
    {
      name: 'createEvent'
      discriminator: [27, 114, 169, 77, 222, 235, 99, 118]
    },
    {
      name: 'globalUpdateEvent'
      discriminator: [153, 69, 19, 7, 115, 232, 248, 248]
    },
    {
      name: 'lockDataEvent'
      discriminator: [222, 187, 21, 94, 219, 85, 107, 184]
    },
    {
      name: 'migrateDataEvent'
      discriminator: [204, 161, 27, 246, 125, 209, 106, 23]
    },
    {
      name: 'tradeEvent'
      discriminator: [189, 219, 127, 211, 78, 230, 97, 238]
    },
  ]
  errors: [
    {
      code: 6000
      name: 'notAuthorized'
      msg: 'The given account is not authorized to execute this instruction.'
    },
    {
      code: 6001
      name: 'alreadyInitialized'
      msg: 'The program is already initialized.'
    },
    {
      code: 6002
      name: 'tooMuchSolRequired'
      msg: 'slippage: Too much SOL required to buy the given amount of tokens.'
    },
    {
      code: 6003
      name: 'notNftAuthority'
      msg: 'NFT Authority is different.'
    },
    {
      code: 6004
      name: 'tooLittleSolReceived'
      msg: 'slippage: Too little SOL received to sell the given amount of tokens.'
    },
    {
      code: 6005
      name: 'mintDoesNotMatchBondingCurve'
      msg: 'The mint does not match the bonding curve.'
    },
    {
      code: 6006
      name: 'bondingCurveNotComplete'
      msg: 'The bonding curve has not completed.'
    },
    {
      code: 6007
      name: 'notInitialized'
      msg: 'The program is not initialized.'
    },
    {
      code: 6008
      name: 'initialRealTokenReservesShouldBeLessThanTokenTotalSupply'
      msg: 'initial_real_token_reserves should be less than token_total_supply'
    },
    {
      code: 6009
      name: 'initialVirtualTokenReservesShouldBeGreaterThanInitialRealTokenReserves'
      msg: 'initial_virtual_token_reserves should be greater than initial_real_token_reserves'
    },
    {
      code: 6010
      name: 'feeBasisPointsGreaterThanMaximum'
      msg: 'fee_basis_points greater than maximum'
    },
    {
      code: 6011
      name: 'allZerosWithdrawAuthority'
      msg: 'Withdraw authority cannot be set to System Program ID'
    },
    {
      code: 6012
      name: 'poolMigrationFeeShouldBeLessThanFinalRealSolReserves'
      msg: 'pool_migration_fee should be less than final_real_sol_reserves'
    },
    {
      code: 6013
      name: 'poolMigrationFeeShouldBeGreaterThanCreatorFeePlusMaxMigrateFees'
      msg: 'pool_migration_fee should be greater than creator_fee + MAX_MIGRATE_FEES'
    },
    {
      code: 6014
      name: 'disabledWithdraw'
      msg: 'Withdraw instruction is disabled'
    },
    {
      code: 6015
      name: 'disabledMigrate'
      msg: 'Migrate instruction is disabled'
    },
    {
      code: 6016
      name: 'emptyMigrate'
      msg: "Can't migrate empty token"
    },
    {
      code: 6017
      name: 'alreadyMigrate'
      msg: 'Token already migrated'
    },
    {
      code: 6018
      name: 'invalidCreator'
      msg: 'Invalid creator pubkey'
    },
    {
      code: 6019
      name: 'buyZeroAmount'
      msg: 'Buy zero amount'
    },
    {
      code: 6020
      name: 'zeroFeeClaimed'
      msg: 'Zero fee claimed'
    },
    {
      code: 6021
      name: 'notEnoughTokensToBuy'
      msg: 'Not enough tokens to buy'
    },
    {
      code: 6022
      name: 'sellZeroAmount'
      msg: 'Sell zero amount'
    },
    {
      code: 6023
      name: 'notEnoughTokensToSell'
      msg: 'Not enough tokens to sell'
    },
    {
      code: 6024
      name: 'overflow'
      msg: 'overflow'
    },
    {
      code: 6025
      name: 'allFeeRecipientsShouldBeNonZero'
      msg: 'All fee recipients should be non-zero'
    },
    {
      code: 6026
      name: 'notUniqueFeeRecipients'
      msg: 'Not unique fee recipients'
    },
    {
      code: 6027
      name: 'incorrectFeeRecipient'
      msg: 'Fee recipient address is not match with the one in the config'
    },
    {
      code: 6028
      name: 'amountZero'
      msg: 'Amount transfer is 0'
    },
    {
      code: 6029
      name: 'curveAlreadyCompleted'
      msg: 'Curve is already completed'
    },
    {
      code: 6030
      name: 'notAuthorizedCreator'
      msg: 'Creator account is different with metadata.'
    },
  ]
  types: [
    {
      name: 'bondingCurve'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'virtualTokenReserves'
            type: 'u64'
          },
          {
            name: 'virtualSolReserves'
            type: 'u64'
          },
          {
            name: 'realTokenReserves'
            type: 'u64'
          },
          {
            name: 'realSolReserves'
            type: 'u64'
          },
          {
            name: 'tokenTotalSupply'
            type: 'u64'
          },
          {
            name: 'complete'
            type: 'bool'
          },
          {
            name: 'creator'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'claimCreatorFeeEvent'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'timestamp'
            type: 'i64'
          },
          {
            name: 'creator'
            type: 'pubkey'
          },
          {
            name: 'creatorFee'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'completeEvent'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'user'
            type: 'pubkey'
          },
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'bondingCurve'
            type: 'pubkey'
          },
          {
            name: 'timestamp'
            type: 'i64'
          },
        ]
      }
    },
    {
      name: 'createEvent'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'name'
            type: 'string'
          },
          {
            name: 'symbol'
            type: 'string'
          },
          {
            name: 'uri'
            type: 'string'
          },
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'bondingCurve'
            type: 'pubkey'
          },
          {
            name: 'user'
            type: 'pubkey'
          },
          {
            name: 'creator'
            type: 'pubkey'
          },
          {
            name: 'timestamp'
            type: 'i64'
          },
          {
            name: 'virtualTokenReserves'
            type: 'u64'
          },
          {
            name: 'virtualSolReserves'
            type: 'u64'
          },
          {
            name: 'realTokenReserves'
            type: 'u64'
          },
          {
            name: 'tokenTotalSupply'
            type: 'u64'
          },
        ]
      }
    },
    {
      name: 'global'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'initialized'
            type: 'bool'
          },
          {
            name: 'authority'
            type: 'pubkey'
          },
          {
            name: 'feeRecipients'
            type: {
              array: ['pubkey', 8]
            }
          },
          {
            name: 'initialVirtualTokenReserves'
            type: 'u64'
          },
          {
            name: 'initialVirtualSolReserves'
            type: 'u64'
          },
          {
            name: 'initialRealTokenReserves'
            type: 'u64'
          },
          {
            name: 'tokenTotalSupply'
            type: 'u64'
          },
          {
            name: 'feeBasisPoints'
            type: 'u64'
          },
          {
            name: 'withdrawAuthority'
            type: 'pubkey'
          },
          {
            name: 'nftAuthority'
            type: 'pubkey'
          },
          {
            name: 'enableMigrate'
            type: 'bool'
          },
          {
            name: 'poolMigrationFee'
            type: 'u64'
          },
          {
            name: 'creatorFeeBasisPoints'
            type: 'u64'
          },
          {
            name: 'adminSetCreatorAuthority'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'globalUpdateEvent'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'globalAuthority'
            type: 'pubkey'
          },
          {
            name: 'migrationAuthority'
            type: 'pubkey'
          },
          {
            name: 'initialVirtualTokenReserves'
            type: 'u64'
          },
          {
            name: 'initialVirtualSolReserves'
            type: 'u64'
          },
          {
            name: 'initialRealTokenReserves'
            type: 'u64'
          },
          {
            name: 'tokenTotalSupply'
            type: 'u64'
          },
          {
            name: 'feeBps'
            type: 'u64'
          },
          {
            name: 'mintDecimals'
            type: 'u8'
          },
        ]
      }
    },
    {
      name: 'lockDataEvent'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'poolState'
            type: 'pubkey'
          },
          {
            name: 'feeNft'
            type: 'pubkey'
          },
          {
            name: 'feeNftAccount'
            type: 'pubkey'
          },
          {
            name: 'lockedLiquidity'
            type: 'pubkey'
          },
          {
            name: 'lockedLpVault'
            type: 'pubkey'
          },
        ]
      }
    },
    {
      name: 'migrateDataEvent'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'poolState'
            type: 'pubkey'
          },
          {
            name: 'lpMint'
            type: 'pubkey'
          },
          {
            name: 'inputVault'
            type: 'pubkey'
          },
          {
            name: 'outputVault'
            type: 'pubkey'
          },
          {
            name: 'observationState'
            type: 'pubkey'
          },
          {
            name: 'timestamp'
            type: 'i64'
          },
        ]
      }
    },
    {
      name: 'tradeEvent'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'mint'
            type: 'pubkey'
          },
          {
            name: 'solAmount'
            type: 'u64'
          },
          {
            name: 'tokenAmount'
            type: 'u64'
          },
          {
            name: 'isBuy'
            type: 'bool'
          },
          {
            name: 'user'
            type: 'pubkey'
          },
          {
            name: 'timestamp'
            type: 'i64'
          },
          {
            name: 'virtualSolReserves'
            type: 'u64'
          },
          {
            name: 'virtualTokenReserves'
            type: 'u64'
          },
          {
            name: 'realSolReserves'
            type: 'u64'
          },
          {
            name: 'realTokenReserves'
            type: 'u64'
          },
          {
            name: 'feeRecipient'
            type: 'pubkey'
          },
          {
            name: 'feeBasisPoints'
            type: 'u64'
          },
          {
            name: 'fee'
            type: 'u64'
          },
          {
            name: 'creator'
            type: 'pubkey'
          },
          {
            name: 'creatorFeeBasisPoints'
            type: 'u64'
          },
          {
            name: 'creatorFee'
            type: 'u64'
          },
        ]
      }
    },
  ]
}
