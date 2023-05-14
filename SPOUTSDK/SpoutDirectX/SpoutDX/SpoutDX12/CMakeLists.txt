#\-------------------------------------- . -----------------------------------/#
# Filename : CMakeList.txt               | SpoutDX CMakeList                   #
# Author   : Alexandre Buge              |                                     #
# Started  : 08/09/2020 12:00            |                                     #
# Modifications : spout.zeal.co                                                #
# 29/04/21 - Add copy of build files to Binary folders                         #
#          - Support single config generators (ninja, etc) by Joakim Kilby     #
#/-------------------------------------- . -----------------------------------\#

add_library(SpoutDX12 SHARED 
  SpoutDX12.h
  SpoutDX12.cpp
)

target_link_libraries(SpoutDX12
  PRIVATE 
    Spout_static
		SpoutDX
)

target_compile_definitions(SpoutDX12
  PRIVATE
    SPOUT_BUILD_DLL
    SPOUTLIBRARY_EXPORTS
)

get_property(GeneratorisMultiConfig GLOBAL PROPERTY GENERATOR_IS_MULTI_CONFIG)
if(GeneratorisMultiConfig)
	set(ConfigOutputDirectory $<CONFIG>/)
endif()

# Win32 or x64 build
if(CMAKE_SIZEOF_VOID_P EQUAL 4)

	# Copy Win32 binaries to the BUILD/Binaries folder
	add_custom_command(TARGET SpoutDX12 POST_BUILD
		COMMAND ${CMAKE_COMMAND} -E 
		copy ${CMAKE_CURRENT_BINARY_DIR}/${ConfigOutputDirectory}SpoutDX12.lib ${CMAKE_BINARY_DIR}/Binaries/Win32/SpoutDX12.lib
	)
	add_custom_command(TARGET SpoutDX12 POST_BUILD
	    COMMAND ${CMAKE_COMMAND} -E 
		copy $<TARGET_FILE:SpoutDX12> ${CMAKE_BINARY_DIR}/Binaries/Win32/SpoutDX12.dll
	)

else()

	# Copy x64 binaries to the BUILD/Binaries folder
	add_custom_command(TARGET SpoutDX12 POST_BUILD
		COMMAND ${CMAKE_COMMAND} -E 
		copy ${CMAKE_CURRENT_BINARY_DIR}/${ConfigOutputDirectory}SpoutDX12.lib ${CMAKE_BINARY_DIR}/Binaries/x64/SpoutDX12.lib
	)
	add_custom_command(TARGET SpoutDX12 POST_BUILD
	    COMMAND ${CMAKE_COMMAND} -E 
		copy $<TARGET_FILE:SpoutDX12> ${CMAKE_BINARY_DIR}/Binaries/x64/SpoutDX12.dll
	)

endif()
