
module.exports = {
    error_Duplicates_Driver:  {code: 1000, message:`ERROR - Duplicates detected @ the 'Driver' level`},
    error_Duplicates_Channel: {code: 1001, message:`ERROR - Duplicates detected @ the 'CCH' level`},
    error_Duplicates_Led:     {code: 1002, message:`ERROR - Duplicates detected @ the 'LCH' level`},
    error_String:             {code: 2000, message:`ERROR - String detected @ the 'LCH' level`},
    error_EmptyFile:          {code: 3000, message:`ERROR - File seems to be empty... Make sure you selected the correct file.`},
    error_Driver_First:       {code: 4000, message:`ERROR - IMPORTANT - Please make sure to fix all 'Driver' issues before tackling 'CCH' and 'LCH' errors`},
    error_missing_Animation:  {code: 5000, message:`ERROR - IMPORTANT - A sequence or SOS is referring to an animation that does not exist`},
    error_missing_Sequence:   {code: 5001, message:`ERROR - IMPORTANT - An SOS is referring to a sequence that does not exist`},
    error_Config_Vars:        {code: 6000, message:`ERROR - SUPER_IMPORTANT - error`}
}

